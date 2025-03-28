import express from 'express';
import { AppDataSource } from '../config/database';
import { TypeORMUser } from '../models/TypeORMUser';
import { getSpotifyPlaylists } from '../utils/spotify';
import { findMatches } from '../utils/matching';
import { Not, IsNull } from 'typeorm';

const router = express.Router();
const userRepository = AppDataSource.getRepository(TypeORMUser);

// Get matches for the current user
router.get('/', async (req, res) => {
  try {
    // Get current user
    const currentUser = await userRepository.findOne({
      where: { id: (req as any).user?.id }
    });
    
    if (!currentUser) {
      return res.status(401).json({ message: 'User not found' });
    }

    // If user doesn't have Spotify connected, return empty matches
    if (!currentUser.spotifyId) {
      return res.json([]);
    }

    // Get current user's playlists
    const currentUserPlaylists = await getSpotifyPlaylists(currentUser.spotifyId);
    const currentUserPlaylistIds = currentUserPlaylists.map((playlist: { id: string }) => playlist.id);

    // Get all other users with Spotify connected
    const otherUsers = await userRepository.find({
      where: {
        id: Not(currentUser.id),
        spotifyId: Not(IsNull())
      }
    });

    // Find matches
    const matches = await findMatches(
      currentUserPlaylistIds,
      otherUsers.map(user => ({
        _id: user.id,
        name: user.name,
        spotifyId: user.spotifyId || ''
      }))
    );

    return res.json(matches);
  } catch (error) {
    console.error('Error finding matches:', error);
    return res.status(500).json({ message: 'Error finding matches' });
  }
});

export default router; 