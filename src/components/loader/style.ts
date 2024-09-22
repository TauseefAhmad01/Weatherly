import {ThemeProps} from '@theme/themeTypes';
import {hexToRgbA} from '@utils/hex-to-rgba';

import {StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';

export const createStyleSheet = (theme: ThemeProps) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: hexToRgbA(theme.colors.black, 1),
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 10000000,
    },
    cloudyAnimation: {width: normalize(100), height: normalize(100)},
    loader: {width: 120, height: 25},
    bgcolor: {
      backgroundColor: hexToRgbA(theme.colors.black, 0.7),
    },
  });
