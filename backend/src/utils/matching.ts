interface User {
  _id: string;
  username: string;
  spotifyId: string;
}

interface Match {
  user: User;
  matchPercentage: number;
  commonPlaylists: string[];
}

export function calculateCompatibility(
  currentUserPlaylists: string[],
  otherUserPlaylists: string[]
): number {
  if (currentUserPlaylists.length === 0 || otherUserPlaylists.length === 0) {
    return 0;
  }

  const commonPlaylists = currentUserPlaylists.filter(playlistId =>
    otherUserPlaylists.includes(playlistId)
  );

  return (commonPlaylists.length / Math.max(currentUserPlaylists.length, otherUserPlaylists.length)) * 100;
}

export async function findMatches(
  currentUserPlaylists: string[],
  otherUsers: User[]
): Promise<Match[]> {
  const matches: Match[] = [];

  for (const user of otherUsers) {
    const userPlaylists: string[] = []; // This should be fetched from Spotify
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