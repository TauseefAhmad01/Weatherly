import {screenHeight, screenWidth} from '@theme/Device';
import {ThemeProps} from '@theme/themeTypes';
import {hexToRgbA} from '@utils/hex-to-rgba';

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
    weatherImage: {
      width: normalize(180),
      height: normalize(180),
      alignSelf: 'center',
      resizeMode: 'contain',
    },
    tempHeading: {
      fontSize: theme.fontSize.font56,
      lineHeight: normalize(64),
      alignSelf: 'center',
      marginTop: normalize(16),
      color: theme.colors.white,
    },
    currentDay: {
      fontSize: theme.fontSize.font30,
      lineHeight: normalize(34),
      alignSelf: 'center',
      //   marginTop: normalize(16),
      color: theme.colors.white,
    },
    infoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: normalize(16),
      marginHorizontal: normalize(8),
    },
    flexRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    infoIcon: {
      width: normalize(26),
      height: normalize(26),
      marginRight: normalize(4),
    },
    infoText: {
      fontSize: theme.fontSize.font16,
      lineHeight: normalize(18),
      alignSelf: 'center',
      color: theme.colors.white,
    },
    mgt8: {
      marginTop: normalize(8),
    },
  });
};
