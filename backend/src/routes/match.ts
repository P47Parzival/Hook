import express from 'express';
import { User } from '../models/User';
import { getSpotifyPlaylists } from '../utils/spotify';
import { findMatches } from '../utils/matching';

const router = express.Router();

// Get matches for the current user
router.get('/matches', async (req, res) => {
  try {
    // Get current user
    const currentUser = await User.findById((req as any).user?.id);
    if (!currentUser) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Get current user's playlists
    const currentUserPlaylists = await getSpotifyPlaylists(currentUser.spotifyId || '');
    const currentUserPlaylistIds = currentUserPlaylists.map((playlist: { id: string }) => playlist.id);

    // Get all other users with Spotify connected
    const otherUsers = await User.find({
      _id: { $ne: currentUser._id },
      spotifyId: { $exists: true }
    });

    // Find matches
    const matches = await findMatches(
      currentUserPlaylistIds,
      otherUsers.map(user => ({
        _id: user._id.toString(),
        username: user.username,
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