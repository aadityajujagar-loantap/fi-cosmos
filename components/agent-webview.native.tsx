import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

import { getAgentWebViewUrl, isAllowedAgentUrl } from '@/config/webview';

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
