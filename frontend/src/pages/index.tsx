import { useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
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
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition duration-300">
              Get Started
            </button>
          </div>
        </div>
      </main>
    </>
  );
} 