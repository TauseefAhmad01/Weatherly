import {screenHeight, screenWidth} from '@theme/Device';
import {ThemeProps} from '@theme/themeTypes';
import {hexToRgbA} from '@utils/hex-to-rgba';

import {StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';

export const createStyleSheet = (theme: ThemeProps) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      width: screenWidth,
      height: screenHeight,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      backgroundColor: hexToRgbA(theme.colors.black, 1),
    },
    cloudyAnimation: {width: normalize(100), height: normalize(100)},
    loader: {width: 120, height: 25},
    bgcolor: {
      backgroundColor: hexToRgbA(theme.colors.black, 0.7),
    },
  });
