interface User {
  _id: string;
  name: string;
  spotifyId: string;
}

interface Match {
  user: User;
  matchPercentage: number;
  commonPlaylists: string[];
}

function calculateCompatibility(playlists1: string[], playlists2: string[]): number {
  if (playlists1.length === 0 || playlists2.length === 0) return 0;

  const commonPlaylists = playlists1.filter(playlistId =>
    playlists2.includes(playlistId)
  );

  return (commonPlaylists.length / Math.min(playlists1.length, playlists2.length)) * 100;
}

export async function findMatches(
  currentUserPlaylists: string[],
  otherUsers: User[]
): Promise<Match[]> {
  const matches: Match[] = [];

  for (const user of otherUsers) {
    // For testing, we'll use a mock playlist
    const userPlaylists = ['playlist1', 'playlist2']; // This should be fetched from Spotify
    const matchPercentage = calculateCompatibility(currentUserPlaylists, userPlaylists);

    if (matchPercentage > 0) {
      const commonPlaylists = currentUserPlaylists.filter(playlistId =>
        userPlaylists.includes(playlistId)
      );

      matches.push({
        user,
        matchPercentage,
        commonPlaylists
      });
    }
  }

  return matches.sort((a, b) => b.matchPercentage - a.matchPercentage);
} 