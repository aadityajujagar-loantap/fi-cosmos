const DEFAULT_WEBSITE_BASE_URL = 'https://fi-iflow.vercel.app';

const normalizeBaseUrl = (url: string) => url.trim().replace(/\/+$/, '');

export const getWebsiteBaseUrl = () =>
  normalizeBaseUrl(process.env.EXPO_PUBLIC_WEBSITE_BASE_URL || DEFAULT_WEBSITE_BASE_URL);

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
