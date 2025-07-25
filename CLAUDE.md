# Wisdom Bridge - Project Documentation

## Project Overview

**Wisdom Bridge** is a Next.js 15 web application that bridges generational gaps by connecting young people with older adults for meaningful video conversations. The platform focuses on preserving life stories, sharing wisdom, and creating purposeful intergenerational connections.

- **Project Type**: Progressive Web Application (PWA) with video calling
- **Primary Purpose**: Facilitate meaningful conversations between generations
- **Target Users**: Young people seeking wisdom and older adults wanting to share experiences
- **Key Technologies**: Next.js 15, React 19, TypeScript, Clerk Auth, Daily.co Video, Tailwind CSS v4

## Project Structure

```
wisdom-bridge/
├── app/                        # Next.js 15 App Router
│   ├── (auth)/                # Authentication pages
│   │   ├── sign-in/          # Clerk sign-in
│   │   └── sign-up/          # Clerk sign-up
│   ├── (dashboard)/          # Protected app pages
│   │   ├── dashboard/        # User dashboard
│   │   ├── match/           # Find connections
│   │   ├── connections/     # Manage connections
│   │   ├── profile/         # User profile
│   │   └── settings/        # App settings
│   ├── api/                  # API routes
│   │   ├── daily/           # Video room creation
│   │   └── push/            # Push notifications
│   ├── call/                 # Video calling pages
│   ├── features/             # Feature landing pages
│   ├── layout.tsx           # Root layout with providers
│   └── page.tsx             # Landing page
├── components/               # React components
│   ├── ui/                  # shadcn/ui components
│   ├── providers/           # Context providers
│   └── *.tsx                # Feature components
├── lib/                      # Utilities and types
│   ├── types.ts             # TypeScript definitions
│   ├── api.ts               # API utilities
│   └── utils.ts             # Helper functions
├── public/                   # Static assets
│   ├── icons/               # PWA icons
│   ├── manifest.json        # PWA manifest
│   └── sw.js                # Service worker
├── styles/                   # Global styles
└── hooks/                    # Custom React hooks
```

### Key Files

- **app/layout.tsx**: Root layout with Clerk provider and global setup
- **middleware.ts**: Clerk authentication middleware
- **lib/types.ts**: Core TypeScript interfaces (UserProfile, Connection, etc.)
- **public/sw.js**: Service worker for PWA functionality
- **tailwind.config.ts**: Tailwind CSS v4 configuration

## Dependencies

### Core Dependencies
```json
{
  "next": "15.3.4",              // React framework
  "react": "^19.0.0",            // UI library
  "typescript": "^5",            // Type safety
  "@clerk/nextjs": "^6.16.1",    // Authentication
  "@daily-co/daily-js": "^0.78.0", // Video calling
  "@radix-ui/*": "various",      // UI primitives
  "tailwindcss": "^4.0.0",       // Styling
  "lucide-react": "^0.469.0"     // Icons
}
```

### Development Dependencies
```json
{
  "@types/react": "^19.0.2",     // React types
  "@types/node": "^20",          // Node types
  "eslint": "^8",                // Linting
  "prettier": "^3.4.2",          // Code formatting
  "sharp": "^0.33.5"             // Image optimization
}
```

## How to Run

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm
- Clerk account for authentication
- Daily.co account for video calls

### Installation Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd wisdom-bridge
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Set up environment variables**
```bash
cp .env.local.example .env.local
```

4. **Configure environment variables**
```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# Daily.co Video
NEXT_PUBLIC_DAILY_API_KEY=your_daily_api_key
DAILY_API_KEY=your_daily_api_key

# Optional: Push Notifications
NEXT_PUBLIC_VAPID_PUBLIC_KEY=your_vapid_public_key
VAPID_PRIVATE_KEY=your_vapid_private_key
```

### Running the Project

```bash
# Development mode
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Linting
pnpm lint

# Format code
pnpm format
```

## Key Features

### 1. User Authentication & Roles
- Clerk-based authentication with social logins
- Three user roles: Giver (mentor), Receiver (learner), or Both
- Role selection during onboarding
- Role-based UI elements and navigation

### 2. Video Calling System
- Daily.co integration for reliable video calls
- Temporary rooms with 1-hour expiration
- Maximum 2 participants per call
- Call scheduling and instant connections

### 3. Progressive Web App (PWA)
- Installable on mobile devices
- Offline support with service worker
- Push notifications for call reminders
- Network-first caching strategy

### 4. Connection Management
- Save and manage connections
- View conversation history
- Rate and review conversations
- Block/report functionality

### 5. User Matching
- Smart matching based on availability
- Interest-based pairing (coming soon)
- Time zone consideration

## Architecture Notes

### Design Patterns
- **Component-based architecture**: Modular React components
- **Provider pattern**: Context providers for global state
- **Route grouping**: Next.js route groups for organization
- **Composition pattern**: shadcn/ui composable components

### State Management
- **Server state**: React Server Components for data fetching
- **Client state**: React hooks for local state
- **Auth state**: Clerk hooks for user management
- **No global state management library** (intentional for simplicity)

### External Services
1. **Clerk**: Complete authentication solution
2. **Daily.co**: Video infrastructure
3. **Vercel**: Deployment and hosting

### Data Storage
- **Current**: localStorage for saved connections (MVP)
- **Future**: Supabase or similar for persistent storage

## Development Notes

### Code Style
- TypeScript with strict mode
- Functional components with hooks
- Tailwind CSS for styling
- ESLint and Prettier for consistency

### Component Organization
- UI components in `/components/ui`
- Feature components in `/components`
- Shared types in `/lib/types.ts`
- Utilities in `/lib/utils.ts`

### PWA Implementation
- Service worker with caching strategies
- Push notification support
- Offline fallback page
- App manifest for installation

### Security Considerations
- Protected routes via middleware
- CSP headers for video pages
- Secure video room creation
- User verification (planned)

## Quick Reference

### Common Commands
```bash
# Development
pnpm dev                    # Start dev server on localhost:3000

# Code Quality
pnpm lint                   # Run ESLint
pnpm format                 # Format with Prettier
pnpm format:check          # Check formatting

# Building
pnpm build                  # Create production build
pnpm start                  # Run production server

# PWA Icons Generation
node scripts/generate-pwa-icons.js
```

### Important Files
- **middleware.ts**: Configure public/private routes
- **app/layout.tsx**: Global providers and metadata
- **lib/types.ts**: Add new TypeScript interfaces
- **public/manifest.json**: PWA configuration
- **tailwind.config.ts**: Theme customization

### Troubleshooting Tips

1. **Clerk Authentication Issues**
   - Verify environment variables are set correctly
   - Check middleware.ts for proper route configuration
   - Ensure Clerk dashboard URLs match your app

2. **Video Call Problems**
   - Verify Daily.co API keys are valid
   - Check browser permissions for camera/microphone
   - Ensure CSP headers allow Daily.co domains

3. **PWA Installation**
   - Must be served over HTTPS (or localhost)
   - Check manifest.json is properly configured
   - Service worker must be registered successfully

4. **Build Errors**
   - Clear `.next` folder and rebuild
   - Check for TypeScript errors with `pnpm tsc`
   - Verify all dependencies are installed

### Areas for Improvement (TODOs)
- Implement real database (currently using localStorage)
- Add comprehensive error handling
- Implement user matching algorithm
- Add video recording functionality
- Create automated tests
- Implement analytics tracking
- Add internationalization support

## Deployment Considerations

- **Platform**: Optimized for Vercel deployment
- **Environment**: Requires Node.js 18+
- **SSL**: Required for PWA and video features
- **API Keys**: Secure storage of Clerk and Daily.co keys
- **Performance**: Image optimization with Sharp
- **Monitoring**: Consider adding error tracking (Sentry, etc.)

---

*This documentation was created to help developers quickly understand and work with the Wisdom Bridge codebase. Keep it updated as the project evolves.*