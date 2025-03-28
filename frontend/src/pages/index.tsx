import { useAuth } from '../hooks/useAuth';
import Link from 'next/link';
import Head from 'next/head';

export default function Home() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <Head>
          <title>Hook - Find your song mate</title>
          <meta name="description" content="Connect with people who share your music taste" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
          <div className="container mx-auto px-4 py-16">
            <h1 className="text-5xl font-bold text-center mb-8">
              Welcome to Hook
            </h1>
            <p className="text-xl text-center text-gray-300 mb-12">
              Find your perfect song mate and connect through music
            </p>
            <div className="flex justify-center">
              <Link
                href="/register"
                className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 mr-4"
              >
                Get Started
              </Link>
              <Link
                href="/login"
                className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-full transition duration-300"
              >
                Sign In
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome back, {user.name}!</h2>
        <p className="text-gray-600">
          Connect your Spotify account to start finding your song mates.
        </p>
        <button
          onClick={() => window.location.href = 'http://localhost:3001/api/connect/spotify'}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Connect Spotify
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Feed</h3>
        <p className="text-gray-600">
          Connect your Spotify account to see what your friends are listening to.
        </p>
      </div>
    </div>
  );
} 