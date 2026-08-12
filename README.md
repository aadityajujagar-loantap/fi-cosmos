# FI iFlow Mobile

Expo React Native WebView wrapper for the future mobile agent experience.

## What is included

- Expo SDK 54 with file-based routing.
- Single WebView route in `app/index.tsx`.
- Agent wrapper config in `config/webview.ts`.
- Mobile role loads `${EXPO_PUBLIC_WEBSITE_BASE_URL}/agent`.
- Navigation is limited to the configured `/agent` path.

## Commands

```bash
npm install
npm run lint
npx tsc --noEmit --incremental false
npm start
```

Create `.env` or set the variable before starting Expo:

```bash
EXPO_PUBLIC_WEBSITE_BASE_URL=https://your-demo-domain.com
```

If the variable is not set, the wrapper defaults to `http://localhost:5173/agent` for local website development.
