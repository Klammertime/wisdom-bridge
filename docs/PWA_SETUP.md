# PWA Setup Guide

## Overview

Your Next.js app has been converted to a Progressive Web App (PWA) with the following features:

1. **Manifest.json** - App metadata and icons
2. **Service Worker** - Offline functionality and caching
3. **Mobile Optimization** - Meta tags and viewport settings
4. **Install Prompts** - Custom install prompts for iOS and Android
5. **Push Notifications** - Full push notification support

## Features Implemented

### 1. Manifest and Icons
- `public/manifest.json` - PWA manifest with app metadata
- Icon generator script at `scripts/generate-pwa-icons.js`
- Support for multiple icon sizes (72x72 to 512x512)

### 2. Service Worker
- `public/sw.js` - Service worker with offline support
- Network-first caching strategy
- Offline fallback page at `/offline`
- Background sync capability

### 3. Mobile Optimization
- Viewport meta tags for responsive design
- Apple-specific meta tags for iOS
- Theme color and status bar styling
- Touch icon support

### 4. Install Prompts
- `components/pwa-installer.tsx` - Smart install prompt component
- Detects iOS vs Android/Desktop
- Custom iOS install instructions
- Remembers user dismissal preference

### 5. Push Notifications
- `lib/push-notifications.ts` - Push notification service
- `hooks/use-push-notifications.ts` - React hook for notifications
- `components/push-notification-settings.tsx` - Settings UI component
- API routes for subscription management

## Setup Instructions

### 1. Generate Icons

First, install the sharp dependency:
```bash
npm install --save-dev sharp
```

Then generate the PWA icons:
```bash
node scripts/generate-pwa-icons.js
```

### 2. Configure Push Notifications (Optional)

To enable push notifications:

1. Install web-push:
   ```bash
   npm install web-push
   ```

2. Generate VAPID keys:
   ```bash
   npx web-push generate-vapid-keys
   ```

3. Add to your `.env.local`:
   ```
   NEXT_PUBLIC_VAPID_PUBLIC_KEY=your_public_key
   VAPID_PRIVATE_KEY=your_private_key
   ```

4. Update the API routes in `app/api/push/` to implement your notification logic

### 3. Customize the PWA

1. **Update Icons**: Replace the generated icons with your brand icons
2. **Modify Manifest**: Edit `public/manifest.json` to match your app
3. **Theme Colors**: Update theme colors in manifest and meta tags
4. **Offline Page**: Customize the offline page at `app/offline/page.tsx`

## Testing Your PWA

### Desktop Chrome
1. Open Chrome DevTools
2. Go to Application > Manifest
3. Check "Service Workers" section
4. Test offline mode in Network tab

### Mobile Testing
1. Deploy to HTTPS (required for PWA)
2. Open in mobile browser
3. Look for install prompt
4. Test offline functionality

### Lighthouse Audit
Run a Lighthouse audit to check PWA compliance:
1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Check "Progressive Web App"
4. Run audit

## Deployment Notes

- PWA features require HTTPS (except localhost)
- Service worker updates automatically on deployment
- Clear cache if changes don't appear immediately
- Test on real devices for best results

## Troubleshooting

### Icons Not Showing
- Ensure icons are generated in `public/icons/`
- Check paths in manifest.json
- Verify CORS headers if hosted on CDN

### Service Worker Not Registering
- Check browser console for errors
- Ensure HTTPS is enabled
- Try unregistering old service workers

### Install Prompt Not Appearing
- Must be served over HTTPS
- User must visit site twice (engagement requirement)
- Check if already installed
- iOS requires manual installation

## Next Steps

1. Customize the icon design
2. Implement push notification backend
3. Add more offline functionality
4. Optimize caching strategy
5. Add app shortcuts in manifest