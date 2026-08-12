import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

import { getAgentWebViewUrl, isAllowedAgentUrl } from '@/config/webview';

export default function AgentWrapperScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <WebView
        source={{ uri: getAgentWebViewUrl() }}
        onShouldStartLoadWithRequest={(request) => isAllowedAgentUrl(request.url)}
        startInLoadingState
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
