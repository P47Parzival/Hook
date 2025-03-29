// // import { useAuth } from '../hooks/useAuth';
// // import Link from 'next/link';
// // import Head from 'next/head';

// // export default function Home() {
// //   const { user, isLoading } = useAuth();

// //   if (isLoading) {
// //     return (
// //       <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
// //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
// //       </div>
// //     );
// //   }

// //   if (!user) {
// //     return (
// //       <>
// //         <Head>
// //           <title>Hook - Find your song mate</title>
// //           <meta name="description" content="Connect with people who share your music taste" />
// //           <meta name="viewport" content="width=device-width, initial-scale=1" />
// //           <link rel="icon" href="/favicon.ico" />
// //         </Head>

// //         <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
// //           <div className="container mx-auto px-4 py-16">
// //             <h1 className="text-5xl font-bold text-center mb-8">
// //               Welcome to Hook
// //             </h1>
// //             <p className="text-xl text-center text-gray-300 mb-12">
// //               Find your perfect song mate and connect through music
// //             </p>
// //             <div className="flex justify-center">
// //               <Link
// //                 href="/register"
// //                 className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 mr-4"
// //               >
// //                 Get Started
// //               </Link>
// //               <Link
// //                 href="/login"
// //                 className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-full transition duration-300"
// //               >
// //                 Sign In
// //               </Link>
// //             </div>
// //           </div>
// //         </main>
// //       </>
// //     );
// //   }

// //   return (
// //     <div className="max-w-2xl mx-auto">
// //       <div className="bg-white shadow rounded-lg p-6 mb-6">
// //         <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome back, {user.name}!</h2>
// //         <p className="text-gray-600">
// //           Connect your Spotify account to start finding your song mates.
// //         </p>
// //         <button
// //           onClick={() => window.location.href = 'http://localhost:3001/api/connect/spotify'}
// //           className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
// //         >
// //           Connect Spotify
// //         </button>
// //       </div>

// //       <div className="bg-white shadow rounded-lg p-6">
// //         <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Feed</h3>
// //         <p className="text-gray-600">
// //           Connect your Spotify account to see what your friends are listening to.
// //         </p>
// //       </div>
// //     </div>
// //   );
// // } 

// import { useAuth } from '../hooks/useAuth';
// import Link from 'next/link';
// import Head from 'next/head';

// export default function Home() {
//   const { user, isLoading } = useAuth();

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-950">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600"></div>
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <>
//         <Head>
//           <title>Hook - Find your song mate</title>
//           <meta name="description" content="Connect with people who share your music taste" />
//           <meta name="viewport" content="width=device-width, initial-scale=1" />
//           <link rel="icon" href="/favicon.ico" />
//         </Head>

//         <main className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-black text-white overflow-hidden">
//           <div className="relative container mx-auto px-4 py-20 md:py-32">
//             {/* Abstract music-themed decorations */}
//             <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-600 rounded-full opacity-10 blur-3xl"></div>
//             <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-600 rounded-full opacity-10 blur-3xl"></div>
            
//             <div className="relative z-10">
//               <h1 className="text-5xl md:text-7xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
//                 Welcome to Hook
//               </h1>
              
//               <p className="text-xl md:text-2xl text-center text-gray-300 mb-12 max-w-2xl mx-auto">
//                 Find your perfect song mate and connect through music
//               </p>
              
//               <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
//                 <Link
//                   href="/register"
//                   className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg hover:shadow-indigo-500/30 text-center"
//                 >
//                   Get Started
//                 </Link>
//                 <Link
//                   href="/login"
//                   className="cursor-pointer bg-transparent border-2 border-indigo-500 text-white font-bold py-3 px-8 rounded-full transition duration-300 hover:bg-indigo-900/30 text-center"
//                 >
//                   Sign In
//                 </Link>
//               </div>
              
//               <div className="mt-20 text-center">
//                 <p className="text-gray-400">Connect with music lovers worldwide</p>
//                 <div className="flex justify-center mt-4 space-x-4">
//                   <span className="w-8 h-8 bg-green-500 rounded-full"></span>
//                   <span className="w-8 h-8 bg-purple-500 rounded-full"></span>
//                   <span className="w-8 h-8 bg-indigo-500 rounded-full"></span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//       </>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 pt-12 pb-20 px-4">
//       <div className="max-w-2xl mx-auto space-y-6">
//         <div className="bg-white shadow-xl rounded-2xl p-6 mb-6 border border-gray-100 transition-all hover:shadow-2xl">
//           <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
//             <span className="bg-indigo-600 w-2 h-8 mr-3 rounded"></span>
//             Welcome back, {user.name}!
//           </h2>
          
//           <p className="text-gray-600 mb-6">
//             Connect your Spotify account to start finding your song mates and share your musical journey.
//           </p>
          
//           <button
//             onClick={() => window.location.href = 'http://localhost:3001/api/connect/spotify'}
//             className="w-full sm:w-auto bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-300 flex items-center justify-center font-medium"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
//               <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
//             </svg>
//             Connect Spotify
//           </button>
//         </div>

//         <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
//           <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
//             <span className="bg-purple-600 w-2 h-6 mr-3 rounded"></span>
//             Your Feed
//           </h3>
          
//           <div className="py-8 flex flex-col items-center text-center">
//             <div className="w-16 h-16 bg-gray-200 rounded-full mb-4 flex items-center justify-center">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
//               </svg>
//             </div>
            
//             <p className="text-gray-600 mb-4">
//               Connect your Spotify account to see what your friends are listening to.
//             </p>
            
//             <span className="text-sm text-gray-400">Your music journey awaits</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useAuth } from '../hooks/useAuth';
import Link from 'next/link';
import Head from 'next/head';
import { useEffect, useState } from 'react';

// Music Note component for the animation
const MusicNote = ({ delay, duration, left }: { delay: number; duration: number; left: string }) => {
  return (
    <div 
      className="absolute text-indigo-400 opacity-70 animate-float"
      style={{
        left,
        top: '-50px',
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`
      }}
    >
      {Math.random() > 0.5 ? '♪' : '♫'}
    </div>
  );
};

export default function Home() {
  const { user, isLoading } = useAuth();
  const [musicNotes, setMusicNotes] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (!user) {
      // Generate falling music notes
      const notes: JSX.Element[] = [];
      const noteCount = 20;
      
      for (let i = 0; i < noteCount; i++) {
        const delay = Math.random() * 15; // Random delay between 0-15s
        const duration = 7 + Math.random() * 10; // Fall duration between 7-17s
        const left = `${Math.random() * 100}%`; // Random horizontal position
        const key = `note-${i}`;
        
        notes.push(
          <MusicNote key={key} delay={delay} duration={duration} left={left} />
        );
      }
      
      setMusicNotes(notes);
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-950">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600"></div>
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
          <style>{`
            @keyframes float {
              0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
              }
              10% {
                opacity: 0.7;
              }
              90% {
                opacity: 0.7;
              }
              100% {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
              }
            }
            
            @keyframes pulse {
              0%, 100% {
                transform: scale(1);
              }
              50% {
                transform: scale(1.05);
              }
            }
            
            .animate-float {
              animation: float linear forwards;
            }
            
            .animate-pulse-slow {
              animation: pulse 4s ease-in-out infinite;
            }
          `}</style>
        </Head>

        <main className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-black text-white overflow-hidden">
          {/* Music Notes Animation */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none text-2xl">
            {musicNotes}
          </div>

          <div className="relative container mx-auto px-4 py-20 md:py-32 z-10">
            {/* Abstract music-themed decorations */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-600 rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-600 rounded-full opacity-10 blur-3xl"></div>
            
            {/* Audio wave visualization */}
            <div className="flex justify-center gap-1 mb-12 h-8">
              {[...Array(20)].map((_, i) => (
                <div 
                  key={`wave-${i}`} 
                  className="w-1 bg-indigo-500 rounded-full opacity-70"
                  style={{ 
                    height: `${Math.sin(i/2) * 20 + 30}%`,
                    animationDelay: `${i * 0.1}s`,
                    animation: 'pulse 1.5s ease-in-out infinite'
                  }}
                ></div>
              ))}
            </div>
            
            <div className="relative z-10">
              <h1 className="text-5xl md:text-7xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 animate-pulse-slow">
                Welcome to Hook
              </h1>
              
              <p className="text-xl md:text-2xl text-center text-gray-300 mb-12 max-w-2xl mx-auto">
                Find your perfect song mate and connect through music
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
                <Link
                  href="/register"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg hover:shadow-indigo-500/30 text-center transform hover:scale-105"
                >
                  Get Started
                </Link>
                <Link
                  href="/login"
                  className="bg-transparent border-2 border-indigo-500 text-white font-bold py-3 px-8 rounded-full transition duration-300 hover:bg-indigo-900/30 text-center transform hover:scale-105"
                >
                  Sign In
                </Link>
              </div>
              
              <div className="mt-20 text-center">
                <p className="text-gray-400">Connect with music lovers worldwide</p>
                
                {/* Equalizer bars */}
                <div className="flex justify-center mt-4 h-8 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={`eq-${i}`} 
                      className="w-2 bg-gradient-to-t from-purple-500 to-indigo-500 rounded-full"
                      style={{ 
                        height: `${(i % 3 + 1) * 25}%`,
                        animation: 'pulse 0.7s ease-in-out infinite',
                        animationDelay: `${i * 0.15}s`
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-12 pb-20 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-white shadow-xl rounded-2xl p-6 mb-6 border border-gray-100 transition-all hover:shadow-2xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="bg-indigo-600 w-2 h-8 mr-3 rounded"></span>
            Welcome back, {user.name}!
          </h2>
          
          <p className="text-gray-600 mb-6">
            Connect your Spotify account to start finding your song mates and share your musical journey.
          </p>
          
          <button
            onClick={() => window.location.href = 'http://localhost:3001/api/connect/spotify'}
            className="w-full sm:w-auto bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-300 flex items-center justify-center font-medium group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 group-hover:animate-spin" style={{ animationDuration: '3s' }} fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            Connect Spotify
          </button>
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="bg-purple-600 w-2 h-6 mr-3 rounded"></span>
            Your Feed
          </h3>
          
          <div className="py-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full mb-4 flex items-center justify-center relative overflow-hidden">
              <div className="absolute w-full h-1 bg-gray-300 top-1/2 transform -translate-y-1/2"></div>
              <div className="absolute w-1 h-full bg-gray-300 left-1/2 transform -translate-x-1/2"></div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
            
            <p className="text-gray-600 mb-4">
              Connect your Spotify account to see what your friends are listening to.
            </p>
            
            <span className="text-sm text-gray-400">Your music journey awaits</span>
          </div>
        </div>
      </div>
    </div>
  );
}