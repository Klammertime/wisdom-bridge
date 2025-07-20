# Wisdom Bridge

A Next.js 15 application that connects people for meaningful video conversations to share life wisdom and advice.

## Features

- **User Authentication**: Secure sign-in/sign-up with Clerk (email, Google, etc.)
- **Role Selection**: Choose to give advice, receive advice, or both
- **Smart Matching**: Connect with compatible users based on their selected roles
- **Video Calls**: Real-time video conversations powered by Daily.co
- **Connection Management**: Save and view your past connections

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4 + ShadCN UI
- **Authentication**: Clerk
- **Video Calls**: Daily.co
- **Language**: TypeScript
- **Code Quality**: ESLint (flat config) + Prettier

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Clerk account (for authentication)
- Daily.co account (for video calls)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd wisdom-bridge
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

4. Update `.env.local` with your credentials:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_DAILY_API_KEY=your_daily_api_key
DAILY_API_KEY=your_daily_api_key
```

## Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Project Structure

```
wisdom-bridge/
├── app/                    # Next.js 15 app directory
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page
│   ├── sign-in/           # Sign-in page
│   ├── sign-up/           # Sign-up page
│   ├── onboarding/        # Role selection
│   ├── dashboard/         # User dashboard
│   ├── match/             # Matching page
│   └── call/              # Video call page
├── components/            
│   └── ui/                # ShadCN UI components
├── lib/                   
│   ├── api.ts             # API functions
│   ├── types.ts           # TypeScript types
│   └── utils.ts           # Utility functions
├── styles/
│   └── globals.css        # Global styles
└── public/                # Static assets
```

## Usage

1. **Sign Up/Sign In**: Create an account or log in using Clerk
2. **Choose Your Role**: Select whether you want to give advice, receive advice, or both
3. **Find a Match**: Click "Find a Match" to connect with a compatible user
4. **Start Video Call**: Begin your wisdom-sharing conversation
5. **Save Connection**: Optionally save the connection for future reference

## Notes

- The matching system uses a mock API for the MVP
- Video rooms are created with Daily.co (requires valid API key)
- Saved connections are stored in localStorage (ready for database integration)

## Future Enhancements

- Database integration (Supabase ready)
- Advanced matching algorithms
- User profiles and preferences
- Chat messaging
- Session recordings
- Rating system

## License

[Your License Here]