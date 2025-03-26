import express, { Response } from 'express';
import { AppDataSource } from '../config/database';
import { FeedPost } from '../models/FeedPost';
import { redisClient } from '../services/redis';
import { AuthenticatedRequest } from '../types/custom';

const router = express.Router();
const feedRepository = AppDataSource.getRepository(FeedPost);

// Create a new feed post
router.post('/', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { songId, comment } = req.body;

    if (!userId || !songId) {
      return res.status(400).json({ message: 'User ID and song ID are required' });
    }

    const post = feedRepository.create({
      userId,
      songId,
      comment
    });

    await feedRepository.save(post);
    return res.status(201).json(post);
  } catch (error) {
    console.error('Error creating feed post:', error);
    return res.status(500).json({ message: 'Error creating feed post' });
  }
});

// Get user's feed
router.get('/', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const posts = await feedRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' }
    });

    return res.json(posts);
  } catch (error) {
    console.error('Error fetching feed:', error);
    return res.status(500).json({ message: 'Error fetching feed' });
  }
});

// Update now playing status
router.post('/now-playing', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { songId, songName, artistName } = req.body;

    if (!userId || !songId || !songName || !artistName) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const status = {
      songId,
      songName,
      artistName,
      timestamp: Date.now()
    };

    await redisClient.set(
      `now_playing:${userId}`,
      JSON.stringify(status),
      'EX',
      300 // 5 minutes expiration
    );

    return res.json(status);
  } catch (error) {
    console.error('Error updating now playing status:', error);
    return res.status(500).json({ message: 'Error updating now playing status' });
  }
});

// Get now playing status for multiple users
router.get('/now-playing', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userIds = (req.query.userIds as string)?.split(',') || [];
    if (userIds.length === 0) {
      return res.status(400).json({ message: 'User IDs are required' });
    }

    const statuses = await Promise.all(
      userIds.map(async (userId) => {
        const status = await redisClient.get(`now_playing:${userId}`);
        return {
          userId,
          status: status ? JSON.parse(status) : null
        };
      })
    );

    return res.json(statuses);
  } catch (error) {
    console.error('Error fetching now playing statuses:', error);
    return res.status(500).json({ message: 'Error fetching now playing statuses' });
  }
});

export default router; 