import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

import { getAgentWebViewUrl, isAllowedAgentUrl } from '@/config/webview';

const disableZoomScript = `
  (function () {
    var content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover';
    var viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.name = 'viewport';
      document.head.appendChild(viewport);
    }
    viewport.setAttribute('content', content);
    document.documentElement.style.webkitTextSizeAdjust = '100%';
    if (document.body) {
      document.body.style.webkitTextSizeAdjust = '100%';
    }
  })();
  true;
`;

export function AgentWebView() {
  return (
    <SafeAreaView style={styles.screen}>
      <WebView
        source={{ uri: getAgentWebViewUrl() }}
        originWhitelist={['http://*', 'https://*']}
        onShouldStartLoadWithRequest={(request) => isAllowedAgentUrl(request.url)}
        startInLoadingState
        javaScriptEnabled
        domStorageEnabled
        injectedJavaScript={disableZoomScript}
        injectedJavaScriptBeforeContentLoaded={disableZoomScript}
        scalesPageToFit={false}
        setBuiltInZoomControls={false}
        setDisplayZoomControls={false}
        textZoom={100}
        setSupportMultipleWindows={false}
        geolocationEnabled
        allowsInlineMediaPlayback
        mediaCapturePermissionGrantType="grant"
        mediaPlaybackRequiresUserAction={false}
        renderLoading={() => (
          <View style={styles.centered}>
            <ActivityIndicator color="#111827" />
          </View>
        )}
        renderError={() => <View style={styles.centered} />}
        style={styles.webView}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  webView: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  centered: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    flex: 1,
    justifyContent: 'center',
  },
});
