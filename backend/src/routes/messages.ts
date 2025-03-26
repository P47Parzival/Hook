import express, { Response } from 'express';
import { AppDataSource } from '../config/database';
import { Message } from '../models/Message';
import { AuthenticatedRequest } from '../types/custom';

const router = express.Router();
const messageRepository = AppDataSource.getRepository(Message);

// Get messages between two users
router.get('/', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const senderId = req.user?.id;
    const receiverId = req.query.receiverId as string;

    if (!senderId || !receiverId) {
      return res.status(400).json({ message: 'Sender and receiver IDs are required' });
    }

    const messages = await messageRepository.find({
      where: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId }
      ],
      order: { createdAt: 'ASC' }
    });

    return res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return res.status(500).json({ message: 'Error fetching messages' });
  }
});

// Send a message
router.post('/', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const senderId = req.user?.id;
    const { receiverId, content } = req.body;

    if (!senderId || !receiverId || !content) {
      return res.status(400).json({ message: 'Sender ID, receiver ID, and content are required' });
    }

    const message = messageRepository.create({
      senderId,
      receiverId,
      content
    });

    await messageRepository.save(message);
    return res.status(201).json(message);
  } catch (error) {
    console.error('Error sending message:', error);
    return res.status(500).json({ message: 'Error sending message' });
  }
});

export default router; 