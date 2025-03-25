# Hook

# Launching soon .........

# 📁 SongMate App (Next.js + Express TypeScript)

## 📂 Backend (Express + TypeScript)
/backend
│── /src
│   ├── /config          # Configuration files (DB, environment variables)
│   │   ├── db.ts        # Database connection setup
│   │   ├── env.ts       # Environment variables loader
│   ├── /controllers     # API request handling logic
│   │   ├── authController.ts     # User authentication logic
│   │   ├── spotifyController.ts  # Spotify OAuth & API integration
│   │   ├── chatController.ts     # Handles 1-on-1 chat messaging
│   ├── /middlewares     # Express middleware (auth, errors, validation)
│   │   ├── authMiddleware.ts  # JWT authentication middleware
│   │   ├── errorMiddleware.ts # Global error handling
│   ├── /models          # Database models (MongoDB/PostgreSQL schemas)
│   │   ├── User.ts      # User schema (MongoDB)
│   │   ├── Message.ts   # Chat messages schema (PostgreSQL)
│   ├── /routes          # Express API routes
│   │   ├── authRoutes.ts    # Authentication routes (`/api/auth/`)
│   │   ├── spotifyRoutes.ts # Spotify API routes (`/api/spotify/`)
│   │   ├── chatRoutes.ts    # Chat API routes (`/api/chat/`)
│   ├── /services        # Business logic & API interactions
│   │   ├── spotifyService.ts  # Spotify API service
│   │   ├── matchingService.ts # User song matching algorithm
│   ├── /sockets         # WebSockets (Socket.IO) for real-time features
│   │   ├── chatSocket.ts # Handles chat socket events
│   ├── /utils           # Helper functions (bcrypt, JWT, etc.)
│   │   ├── bcrypt.ts    # Password hashing & verification
│   │   ├── jwt.ts       # JWT token generation & verification
│   ├── server.ts        # Main Express server entry point
│── package.json         # Backend dependencies
│── tsconfig.json        # TypeScript configuration
│── .env                 # Environment variables
│── .gitignore           # Ignore sensitive files (node_modules, .env)

## 📂 Frontend (Next + TypeScript)
/frontend
│── /public              # Static assets (images, icons, etc.)
│── /src
│   ├── /components      # Reusable UI components
│   │   ├── Navbar.tsx   # Navigation bar
│   │   ├── Chat.tsx     # 1-on-1 chat UI
│   │   ├── MatchList.tsx # Displays matching users
│   ├── /hooks           # Custom React hooks
│   │   ├── useAuth.ts    # Authentication state management
│   │   ├── useSpotify.ts # Spotify data fetching hook
│   ├── /pages           # Next.js pages (React components)
│   │   ├── /api         # Next.js API routes (optional)
│   │   ├── index.tsx    # Landing page
│   │   ├── profile.tsx  # User profile page
│   │   ├── matches.tsx  # Songmate discovery page
│   ├── /styles          # Global styles (CSS/Tailwind)
│   │   ├── global.css   # Global CSS styles
│── package.json         # Frontend dependencies
│── tsconfig.json        # TypeScript configuration
│── .env                 # Frontend environment variables
│── .gitignore           # Ignore sensitive files
