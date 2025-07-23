# Wisdom Bridge

A Next.js 15 application that connects people for meaningful video conversations to share life wisdom and advice.

## 🌟 Live Demo

**[Try Bridge Now →](https://wisdom-bridge.vercel.app/)**

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

## 💡 The Problem

Every day, valuable life stories and wisdom from older generations go unheard and unpreserved. Meanwhile, younger people miss out on the guidance and perspective that comes from lived experience. Traditional video chat apps focus on surface-level conversations, not meaningful story-sharing.

## ✨ The Solution

Bridge creates purposeful intergenerational connections through:

- **Smart Matching**: Algorithm connects compatible conversation partners based on interests and availability
- **Story Preservation**: Conversations can be recorded and transformed into lasting memoirs
- **Guided Conversations**: Prompts and topics help overcome awkward silences
- **Safe Environment**: Verified profiles and moderated connections ensure trust

## 🚀 Key Features

### For Older Adults

- 🎙️ Share life stories with eager listeners
- 📚 Transform conversations into digital or printed memoirs
- 🤝 Connect with young people who value wisdom
- 💬 Easy-to-use interface designed for all tech levels

### For Younger Users

- 🌍 Learn from lived experiences across generations
- 📖 Discover family-style wisdom and guidance
- 🎓 Gain mentorship in various life areas
- ❤️ Build meaningful connections

### Coming Soon

- 🤖 AI-powered conversation assistance for accessibility
- 📝 Automated memoir creation from recorded stories
- 🔒 Enhanced verification and safety features
- 📱 Native mobile apps

## License

This project is licensed under the MIT License

<p align="center">
  <i>Every story deserves a listener. Every listener deserves a story.</i>
</p>
<p align="center">
  Made with ❤️ by a developer who misses their grandparents
</p>
```
