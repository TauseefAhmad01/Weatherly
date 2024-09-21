import {screenHeight, screenWidth} from '@theme/Device';
import {ThemeProps} from '@theme/themeTypes';
import {hexToRgbA} from '@utils/hex-to-rgba';

import {Platform, StyleSheet} from 'react-native';
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
      top: normalize(Platform.select({ios: 6, android: 9})),
      right: normalize(Platform.select({ios: 6, android: 8})),
    },
    searchIcon: {
      height: normalize(Platform.select({ios: 24, android: 34})),
      width: normalize(Platform.select({ios: 24, android: 34})),
      resizeMode: 'contain',
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
      height: normalize(22),
      width: normalize(22),
      //   backgroundColor: 'red',
      marginRight: normalize(6),
    },
    searchTextStyle: {
      fontSize: theme.fontSize.font14,
      flex: 1,
      lineHeight: normalize(16),
      fontWeight: '500',
    },
    emptyText: {
      paddingHorizontal: normalize(10),
      paddingVertical: normalize(16),
    },
  });
