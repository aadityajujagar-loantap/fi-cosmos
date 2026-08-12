const DEFAULT_WEBSITE_BASE_URL = 'http://localhost:5173';
const AGENT_ENDPOINT = '/agent';

const normalizeBaseUrl = (url: string) => url.trim().replace(/\/+$/, '');

export const agentWebViewConfig = {
  role: 'agent',
  baseUrl: normalizeBaseUrl(process.env.EXPO_PUBLIC_WEBSITE_BASE_URL || DEFAULT_WEBSITE_BASE_URL),
  endpoint: AGENT_ENDPOINT,
} as const;

export const getAgentWebViewUrl = () => `${agentWebViewConfig.baseUrl}${agentWebViewConfig.endpoint}`;

export const isAllowedAgentUrl = (url: string) => {
  if (url === 'about:blank') {
    return true;
  }

  try {
    const target = new URL(url);
    const agentUrl = new URL(getAgentWebViewUrl());
    const agentPath = agentUrl.pathname.replace(/\/+$/, '');

    return (
      target.origin === agentUrl.origin &&
      (target.pathname === agentPath || target.pathname.startsWith(`${agentPath}/`))
    );
  } catch {
    return false;
  }
};
