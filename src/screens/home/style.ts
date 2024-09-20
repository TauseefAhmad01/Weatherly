import {screenHeight, screenWidth} from '@theme/Device';
import {ThemeProps} from '@theme/themeTypes';

import {Platform, StatusBar, StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const createStyleSheet = (theme: ThemeProps) => {
  const insets = useSafeAreaInsets();
  const height = StatusBar.currentHeight;
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.grayColor,
      paddingTop:
        Platform.OS === 'android' ? normalize(height || 0) : insets.top,
      paddingHorizontal: normalize(16),
    },
    bgImage: {
      position: 'absolute',
      flex: 1,
      width: screenWidth,
      height: screenHeight,
    },
  });
};
