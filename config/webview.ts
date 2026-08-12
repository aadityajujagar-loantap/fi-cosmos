import { Platform } from 'react-native';
import Constants from 'expo-constants';

const DEFAULT_WEBSITE_BASE_URL = 'https://fi-iflow.vercel.app';

const normalizeBaseUrl = (url: string) => url.trim().replace(/\/+$/, '');

export const getWebsiteBaseUrl = () => {
  const envUrl = process.env.EXPO_PUBLIC_WEBSITE_BASE_URL;

  // Automatically resolve local Vite server in development
  if (__DEV__) {
    // If the user specified a custom local IP override in .env, prioritize it
    if (envUrl && !envUrl.includes('vercel.app')) {
      return normalizeBaseUrl(envUrl);
    }

    // On PC web browser (pressing 'w')
    if (Platform.OS === 'web') {
      return 'http://localhost:5173';
    }

    // On Android/iOS Expo Go client, resolve PC's host LAN IP
    const hostUri = Constants.expoConfig?.hostUri;
    if (hostUri) {
      const ip = hostUri.split(':')[0];
      if (ip) {
        return `http://${ip}:5173`;
      }
    }

    // Default loopback fallback
    return 'http://10.0.2.2:5173';
  }

  // Production build
  return normalizeBaseUrl(envUrl || DEFAULT_WEBSITE_BASE_URL);
};

export const agentWebViewConfig = {
  role: 'agent',
} as const;

export const getAgentWebViewUrl = () => getWebsiteBaseUrl() + '/agent';

export const isAllowedAgentUrl = (url: string) => {
  if (url === 'about:blank') {
    return true;
  }

  try {
    const target = new URL(url);
    const agentUrl = new URL(getAgentWebViewUrl());

    return target.origin === agentUrl.origin;
  } catch {
    return false;
  }
};
