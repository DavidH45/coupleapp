# Candle – Developer Requirements Document

## Tech Stack
- React Native via Expo
- Redux Toolkit or Zustand
- Firebase (Auth, Firestore, Storage)
- Expo Notifications or FCM
- Firestore realtime listeners
- Expo Camera & ImagePicker, optional Cloudinary
- Analytics via Amplitude or Firebase

## Core Features
1. User Authentication (email, magic link, invite pairing)
2. Home Dashboard with streak tracker and shortcuts
3. Conversation Starters (swipeable prompts)
4. Photo Prompts (timestamped, calendar history)
5. Thumb Kisses (synchronized taps)
6. Local Date Ideas (beta, location-based)
7. Games & Challenges
8. Streaks and Milestones with notifications
9. Settings & Customization including theme toggle
10. Security & Privacy with end-to-end encryption

## Testing Plan
- Jest unit tests
- Detox E2E tests
- Manual QA on iOS and Android devices

## Deployment
- EAS Build + GitHub Actions
- TestFlight and Google Play internal track
- Permissions: camera, location, notifications, media storage
