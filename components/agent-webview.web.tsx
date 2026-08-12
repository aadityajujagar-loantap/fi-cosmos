import { getAgentWebViewUrl } from '@/config/webview';

export function AgentWebView() {
  return (
    <iframe
      src={getAgentWebViewUrl()}
      style={{
        background: '#FFFFFF',
        border: 0,
        height: '100vh',
        width: '100vw',
      }}
      title="FI iFlow Agent"
    />
  );
}
