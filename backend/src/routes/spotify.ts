import express, { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { TypeORMUser } from '../models/TypeORMUser';
import { getSpotifyAccessToken } from '../utils/spotify';

const router = express.Router();
const userRepository = AppDataSource.getRepository(TypeORMUser);

// Spotify OAuth scopes
const SPOTIFY_SCOPES = [
  'user-read-private',
  'user-read-email',
  'playlist-read-private',
  'playlist-read-collaborative'
].join(' ');

// Redirect to Spotify authorization
router.get('/connect/spotify', (_req: Request, res: Response) => {
  const state = Math.random().toString(36).substring(7);
  const redirectUri = `${process.env.FRONTEND_URL}/api/connect/spotify/callback`;

  const authUrl = new URL('https://accounts.spotify.com/authorize');
  authUrl.searchParams.append('response_type', 'code');
  authUrl.searchParams.append('client_id', process.env.SPOTIFY_CLIENT_ID || '');
  authUrl.searchParams.append('scope', SPOTIFY_SCOPES);
  authUrl.searchParams.append('redirect_uri', redirectUri);
  authUrl.searchParams.append('state', state);

  return res.redirect(authUrl.toString());
});

// Handle Spotify OAuth callback
router.get('/connect/spotify/callback', async (req: Request, res: Response) => {
  try {
    const { code } = req.query;

    if (!code || typeof code !== 'string') {
      return res.status(400).json({ message: 'Authorization code is required' });
    }

    // Get access token from Spotify
    const tokenData = await getSpotifyAccessToken(code);

    // Get user from request (assuming you have authentication middleware)
    const userId = (req as any).user?.id; // You'll need to implement this
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Update user with Spotify data
    await userRepository.update(userId, {
      spotifyId: tokenData.access_token,
      spotifyRefreshToken: tokenData.refresh_token,
      spotifyTokenExpiresAt: new Date(Date.now() + tokenData.expires_in * 1000)
    });

    // Redirect to frontend with success message
    return res.redirect(`${process.env.FRONTEND_URL}/dashboard?spotify=connected`);
  } catch (error) {
    console.error('Spotify callback error:', error);
    return res.redirect(`${process.env.FRONTEND_URL}/dashboard?spotify=error`);
  }
});

export default router; 