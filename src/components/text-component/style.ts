import {ThemeProps} from '@theme/themeTypes';

import {StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';

export const createStyleSheet = (theme: ThemeProps) =>
  StyleSheet.create({
    textStyle: {
      color: theme.colors.primaryColor,
      fontSize: theme.fontSize.font12,
      lineHeight: normalize(14),
    },
  });
