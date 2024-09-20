import {ThemeProps} from '@theme/themeTypes';
import {hexToRgbA} from '@utils/hex-to-rgba';

import {StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';

export const createStyleSheet = (theme: ThemeProps) =>
  StyleSheet.create({
    textInput: {
      backgroundColor: hexToRgbA(theme.colors.white, 0.25),
      borderRadius: theme.borderRadius.radius35,
      paddingLeft: normalize(20),
      paddingVertical: normalize(16),
    },
    searchIconContainer: {
      padding: normalize(6),
      backgroundColor: hexToRgbA(theme.colors.white, 0.4),
      alignSelf: 'flex-end',
      position: 'absolute',
      borderRadius: theme.borderRadius.radius35,
      top: normalize(9),
      right: normalize(8),
    },
    searchIcon: {
      height: normalize(34),
      width: normalize(34),
      //   backgroundColor: 'red',
    },
    searchContainer: {
      backgroundColor: theme.colors.grayColor,
      //   padding: normalize(16),
      borderRadius: theme.borderRadius.radius18,
      marginTop: normalize(10),
    },
    searchItemContainer: {
      padding: normalize(16),
      flexDirection: 'row',
      alignItems: 'center',
    },
    pinIcon: {
      height: normalize(24),
      width: normalize(24),
      //   backgroundColor: 'red',
    },
    searchTextStyle: {
      fontSize: theme.fontSize.font14,
      flex: 1,
      lineHeight: normalize(16),
    },
  });
