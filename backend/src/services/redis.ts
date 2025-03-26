import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

export const redisClient = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD
});

const NOW_PLAYING_PREFIX = 'now_playing:';
const NOW_PLAYING_EXPIRY = 300; // 5 minutes in seconds

interface NowPlayingData {
  songId: string;
  songName: string;
  artistName: string;
  timestamp: number;
}

export const RedisService = {
  // Set user's currently playing song
  async setNowPlaying(userId: string, data: NowPlayingData): Promise<void> {
    const key = `${NOW_PLAYING_PREFIX}${userId}`;
    await redisClient.setex(
      key,
      NOW_PLAYING_EXPIRY,
      JSON.stringify(data)
    );
  },

  // Get user's currently playing song
  async getNowPlaying(userId: string): Promise<NowPlayingData | null> {
    const key = `${NOW_PLAYING_PREFIX}${userId}`;
    const data = await redisClient.get(key);
    
    if (!data) return null;
    
    return JSON.parse(data);
  },

  // Remove user's currently playing song
  async removeNowPlaying(userId: string): Promise<void> {
    const key = `${NOW_PLAYING_PREFIX}${userId}`;
    await redisClient.del(key);
  },

  // Get multiple users' currently playing songs
  async getMultipleNowPlaying(userIds: string[]): Promise<Record<string, NowPlayingData | null>> {
    const pipeline = redisClient.pipeline();
    const keys = userIds.map(id => `${NOW_PLAYING_PREFIX}${id}`);
    
    keys.forEach(key => pipeline.get(key));
    
    const results = await pipeline.exec();
    const nowPlaying: Record<string, NowPlayingData | null> = {};
    
    results?.forEach((result, index) => {
      const userId = userIds[index];
      const data = result[1];
      
      if (data) {
        nowPlaying[userId] = JSON.parse(data as string);
      } else {
        nowPlaying[userId] = null;
      }
    });
    
    return nowPlaying;
  }
}; 