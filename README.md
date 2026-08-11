# FI iFlow Frontend

Expo Router frontend-only demo app for client walkthroughs.

## What is included

- Expo SDK 54 with file-based routing.
- Static mock data in `mocks/`.
- Mock async service layer in `services/`.
- Typed app models in `types/`.
- Local persisted state with Zustand and AsyncStorage in `store/`.
- Clean demo screens under `app/(tabs)/`.

## Commands

```bash
npm install
npm run lint
npx tsc --noEmit --incremental false
npm run web
```

The app does not require a backend. Update the mock data and service layer first, then replace the service implementation later when an API is available.
