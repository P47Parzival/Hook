import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import mongoose from 'mongoose';
import { AppDataSource } from './config/database';
import { Message } from './models/Message';
import authRoutes from './routes/auth';
import spotifyRoutes from './routes/spotify';
import matchRoutes from './routes/match';
import messageRoutes from './routes/messages';
import feedRoutes from './routes/feed';

// Load environment variables
dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? 'https://your-production-domain.com' 
      : 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hook')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Connect to PostgreSQL
AppDataSource.initialize()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch((error) => console.error('PostgreSQL connection error:', error));

// Socket.IO connection handling
const connectedUsers = new Map<string, string>(); // userId -> socketId
const userSockets = new Map<string, string>(); // socketId -> userId

io.on('connection', async (socket: Socket) => {
  console.log('A user connected');

  // Handle user authentication
  socket.on('authenticate', (userId: string) => {
    connectedUsers.set(userId, socket.id);
    userSockets.set(socket.id, userId);
    console.log(`User ${userId} authenticated on socket ${socket.id}`);
  });

  // Handle private messages
  socket.on('private message', async (data: { receiverId: string; content: string }) => {
    try {
      const senderId = userSockets.get(socket.id);
      if (!senderId) {
        throw new Error('Sender not authenticated');
      }

      // Save message to database
      const message = new Message();
      message.content = data.content;
      message.senderId = senderId;
      message.receiverId = data.receiverId;
      await AppDataSource.manager.save(message);

      // Emit to receiver if online
      const receiverSocketId = connectedUsers.get(data.receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('private message', {
          id: message.id,
          content: message.content,
          senderId: message.senderId,
          createdAt: message.createdAt
        });
      }

      // Confirm message sent to sender
      socket.emit('message sent', {
        id: message.id,
        content: message.content,
        receiverId: message.receiverId,
        createdAt: message.createdAt
      });
    } catch (error) {
      console.error('Error sending message:', error);
      socket.emit('message error', { message: 'Failed to send message' });
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    const userId = userSockets.get(socket.id);
    if (userId) {
      connectedUsers.delete(userId);
      userSockets.delete(socket.id);
      console.log(`User ${userId} disconnected`);
    }
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', spotifyRoutes);
app.use('/api', matchRoutes);
app.use('/api', messageRoutes);
app.use('/api', feedRoutes);

// Basic route
app.get('/', (_req, res) => {
  res.json({ message: 'Welcome to Hook API' });
});

// Start server
const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 