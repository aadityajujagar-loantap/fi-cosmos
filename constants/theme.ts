import { Platform } from 'react-native';

const tintColorLight = '#2563EB';
const tintColorDark = '#93C5FD';

export const Colors = {
  light: {
    text: '#111827',
    background: '#F8FAFC',
    tint: tintColorLight,
    icon: '#64748B',
    surface: '#FFFFFF',
    border: '#E2E8F0',
    muted: '#64748B',
    success: '#15803D',
    warning: '#B45309',
    danger: '#B91C1C',
    tabIconDefault: '#64748B',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#F8FAFC',
    background: '#0F172A',
    tint: tintColorDark,
    icon: '#94A3B8',
    surface: '#1E293B',
    border: '#334155',
    muted: '#CBD5E1',
    success: '#86EFAC',
    warning: '#FCD34D',
    danger: '#FCA5A5',
    tabIconDefault: '#94A3B8',
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
