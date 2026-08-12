# FI iFlow Mobile

Expo React Native WebView wrapper for the future mobile agent experience.

## What is included

- Expo SDK 54 with file-based routing.
- Single WebView route in `app/index.tsx`.
- Agent wrapper config in `config/webview.ts`.
- Mobile wrapper loads `EXPO_PUBLIC_WEBSITE_BASE_URL`.
- Without an env var, it loads `https://fi-cosmos.vercel.app`.
- Navigation is limited to the configured website origin.
- Web builds render the same URL in an iframe fallback so `react-native-webview` is only loaded on Android/iOS.

## Commands

```bash
npm install
npm run lint
npx tsc --noEmit --incremental false
npm start
```

Android Expo Go:

```bash
cd mobile
npx expo start --clear --lan
```

Scan the QR code with Expo Go on Android.

PC browser preview:

```bash
npx expo start --clear
```

Press `w`.

Optional manual override:

```bash
EXPO_PUBLIC_WEBSITE_BASE_URL=https://fi-cosmos.vercel.app
```

For local website development on a physical phone, use a reachable LAN URL instead of `localhost`:

```bash
EXPO_PUBLIC_WEBSITE_BASE_URL=http://192.168.1.10:5173
```
