import { useRef } from 'react';
import { ActivityIndicator, Alert, Linking, StyleSheet, View } from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView, type WebViewMessageEvent } from 'react-native-webview';

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

type PdfTransfer = {
  chunks: string[];
  filename: string;
  received: number;
  totalChunks: number;
};

type PdfBridgeMessage =
  | { type: 'fi-iflow/pdf-download/start'; id: string; filename: string; totalChunks: number }
  | { type: 'fi-iflow/pdf-download/chunk'; id: string; index: number; chunk: string }
  | { type: 'fi-iflow/pdf-download/complete'; id: string };

function safePdfFilename(filename: string) {
  const normalized = filename.trim().replace(/[^a-zA-Z0-9._-]/g, '_');
  return normalized.toLowerCase().endsWith('.pdf') ? normalized : `${normalized || 'FI_Report'}.pdf`;
}

export function AgentWebView() {
  const pdfTransfersRef = useRef(new Map<string, PdfTransfer>());

  const savePdfTransfer = async (transfer: PdfTransfer) => {
    const directory = FileSystem.documentDirectory || FileSystem.cacheDirectory;
    if (!directory) {
      Alert.alert('Download failed', 'Device storage is not available.');
      return;
    }

    const filename = safePdfFilename(transfer.filename);
    const fileUri = `${directory}${filename}`;
    const base64 = transfer.chunks.join('');

    try {
      await FileSystem.writeAsStringAsync(fileUri, base64, {
        encoding: FileSystem.EncodingType.Base64,
      });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri, {
          dialogTitle: 'Save or share report PDF',
          mimeType: 'application/pdf',
          UTI: 'com.adobe.pdf',
        });
        return;
      }

      Alert.alert('Report ready', `PDF saved inside app storage as ${filename}.`);
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      Alert.alert('Download failed', `Failed to write or share PDF: ${errMsg}`);
    }
  };

  const handlePdfMessage = async (message: PdfBridgeMessage) => {
    if (message.type === 'fi-iflow/pdf-download/start') {
      pdfTransfersRef.current.set(message.id, {
        chunks: new Array(message.totalChunks).fill(''),
        filename: message.filename,
        received: 0,
        totalChunks: message.totalChunks,
      });
      return;
    }

    const transfer = pdfTransfersRef.current.get(message.id);
    if (!transfer) return;

    if (message.type === 'fi-iflow/pdf-download/chunk') {
      if (!transfer.chunks[message.index]) {
        transfer.received += 1;
      }
      transfer.chunks[message.index] = message.chunk;
      return;
    }

    if (transfer.received !== transfer.totalChunks || transfer.chunks.some((chunk) => !chunk)) {
      Alert.alert('Download failed', 'Report data was incomplete. Please try again.');
      pdfTransfersRef.current.delete(message.id);
      return;
    }

    pdfTransfersRef.current.delete(message.id);
    await savePdfTransfer(transfer);
  };

  const handleMessage = (event: WebViewMessageEvent) => {
    try {
      const message = JSON.parse(event.nativeEvent.data) as PdfBridgeMessage;
      if (message.type?.startsWith('fi-iflow/pdf-download/')) {
        void handlePdfMessage(message);
      }
    } catch {
      // Ignore unrelated page messages.
    }
  };

  const handleShouldStartLoad = (url: string) => {
    if (isAllowedAgentUrl(url)) return true;
    void Linking.openURL(url);
    return false;
  };

  return (
    <SafeAreaView style={styles.screen}>
      <WebView
        source={{ uri: getAgentWebViewUrl() }}
        originWhitelist={['http://*', 'https://*']}
        userAgent="fi-iflow-mobile-app"
        onMessage={handleMessage}
        onShouldStartLoadWithRequest={(request) => handleShouldStartLoad(request.url)}
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
