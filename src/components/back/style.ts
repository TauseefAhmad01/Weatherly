import {ThemeProps} from '@theme/themeTypes';
import {hexToRgbA} from '@utils/hex-to-rgba';
import {StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';

export const createStyleSheet = (theme: ThemeProps) =>
  StyleSheet.create({
    container: {
      backgroundColor: hexToRgbA(theme.colors.black, 0.3),
      alignSelf: 'flex-start',
      padding: normalize(14),
      borderRadius: theme.borderRadius.radius12,
    },
    image: {
      width: normalize(18),
      height: normalize(18),
    },
  });
