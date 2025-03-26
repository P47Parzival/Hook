import axios from 'axios';

interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  images: Array<{ url: string }>;
  tracks: {
    total: number;
  };
}

interface SpotifyTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

interface SpotifyPlaylistsResponse {
  items: SpotifyPlaylist[];
}

interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  album: {
    name: string;
  };
  duration_ms: number;
}

interface SpotifyPlaylistTrack {
  track: SpotifyTrack;
}

interface SpotifyPlaylistTracksResponse {
  items: SpotifyPlaylistTrack[];
}

export async function getSpotifyAccessToken(code: string): Promise<SpotifyTokenResponse> {
  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', `${process.env.FRONTEND_URL}/api/connect/spotify/callback`);

  const response = await axios.post<SpotifyTokenResponse>(
    'https://accounts.spotify.com/api/token',
    params,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString('base64')}`
      }
    }
  );

  return response.data;
}

export async function getSpotifyPlaylists(accessToken: string): Promise<SpotifyPlaylist[]> {
  const response = await axios.get<SpotifyPlaylistsResponse>(
    'https://api.spotify.com/v1/me/playlists',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  );

  return response.data.items.map((playlist) => ({
    id: playlist.id,
    name: playlist.name,
    description: playlist.description,
    images: playlist.images,
    tracks: playlist.tracks
  }));
}

export async function getSpotifyPlaylistTracks(
  accessToken: string,
  playlistId: string
): Promise<Array<{ id: string; name: string; artist: string; album: string; duration: number }>> {
  const response = await axios.get<SpotifyPlaylistTracksResponse>(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  );

  return response.data.items.map((item) => ({
    id: item.track.id,
    name: item.track.name,
    artist: item.track.artists[0].name,
    album: item.track.album.name,
    duration: item.track.duration_ms
  }));
} 