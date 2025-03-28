import express, { Response } from 'express';
import { AppDataSource } from '../config/database';
import { Message } from '../models/Message';
import { TypeORMUser } from '../models/TypeORMUser';
import { AuthenticatedRequest } from '../types/custom';

const router = express.Router();
const messageRepository = AppDataSource.getRepository(Message);
const userRepository = AppDataSource.getRepository(TypeORMUser);

// Get messages between two users
router.get('/', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const senderId = req.user?.id;
    const receiverId = req.query.receiverId as string;

    if (!senderId || !receiverId) {
      return res.status(400).json({ message: 'Sender and receiver IDs are required' });
    }

    // Verify both users exist
    const [sender, receiver] = await Promise.all([
      userRepository.findOne({ where: { id: senderId } }),
      userRepository.findOne({ where: { id: receiverId } })
    ]);

    if (!sender || !receiver) {
      return res.status(404).json({ message: 'One or both users not found' });
    }

    const messages = await messageRepository.find({
      where: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId }
      ],
      order: { createdAt: 'ASC' },
      relations: ['sender', 'receiver']
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

    // Verify both users exist
    const [sender, receiver] = await Promise.all([
      userRepository.findOne({ where: { id: senderId } }),
      userRepository.findOne({ where: { id: receiverId } })
    ]);

    if (!sender || !receiver) {
      return res.status(404).json({ message: 'One or both users not found' });
    }

    const message = messageRepository.create({
      senderId,
      receiverId,
      content
    });

    await messageRepository.save(message);

    // Fetch the saved message with relations
    const savedMessage = await messageRepository.findOne({
      where: { id: message.id },
      relations: ['sender', 'receiver']
    });

    return res.status(201).json(savedMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    return res.status(500).json({ message: 'Error sending message' });
  }
});

export default router; 