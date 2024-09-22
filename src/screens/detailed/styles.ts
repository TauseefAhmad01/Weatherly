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
      color: theme.colors.white,
    },
    infoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
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
    mgt16: {
      marginTop: normalize(16),
    },
    weatherInfoIcon: {
      width: normalize(28),
      height: normalize(28),
    },
    humidityIcon: {
      width: normalize(20),
      height: normalize(20),
      marginRight: normalize(6),
    },
    time: {
      fontSize: theme.fontSize.font14,
      color: theme.colors.white,
      lineHeight: normalize(18),
      fontWeight: '400',
    },
    temp: {
      fontSize: theme.fontSize.font14,
      color: hexToRgbA(theme.colors.white, 0.7),
      lineHeight: normalize(18),
      fontWeight: '400',
    },
    lineItemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: normalize(12),

      paddingVertical: normalize(16),
    },
    humidityText: {
      fontSize: theme.fontSize.font14,
      color: hexToRgbA(theme.colors.white, 0.7),
      lineHeight: normalize(18),
      fontWeight: '400',
    },
    precpPerct: {
      fontSize: theme.fontSize.font14,
      color: hexToRgbA(theme.colors.white, 0.7),
      lineHeight: normalize(18),
      fontWeight: '400',
    },
    precpProb: {
      fontSize: theme.fontSize.font12,
      color: hexToRgbA(theme.colors.white, 0.7),
      lineHeight: normalize(14),
      fontWeight: '400',
    },
    seprator: {
      borderBottomWidth: 1,
      //   borderColor: 'red',
      borderColor: hexToRgbA(theme.colors.white, 0.4),
    },
    calendarIcon: {
      height: normalize(24),
      width: normalize(24),
      resizeMode: 'contain',
      marginRight: normalize(6),
    },
    spaceBetween: {
      justifyContent: 'space-between',
    },
    heading: {
      fontSize: theme.fontSize.font22,
      lineHeight: normalize(33),
      fontWeight: '400',
      color: theme.colors.white,
    },
    pb: {
      paddingBottom: normalize(20),
    },
    flexRowCenter: {flexDirection: 'row', alignItems: 'center'},
    alignCenter: {alignItems: 'center'},
    extrainfo: {
      backgroundColor: hexToRgbA(theme.colors.black, 0.3),
      width: (screenWidth - normalize(64)) / 3,
      alignItems: 'center',
      justifyContent: 'center',
      height: normalize(50),
      borderRadius: theme.borderRadius.radius12,
    },
    detailedListContainer: {
      backgroundColor: hexToRgbA(theme.colors.black, 0.3),
      borderRadius: theme.borderRadius.radius12,
    },
  });
};
