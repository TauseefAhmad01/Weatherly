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
    tempContainer: {
      flexDirection: 'row',
      height: screenHeight / 3,
    },
    tempText: {
      fontSize: theme.fontSize.font56,
      lineHeight: normalize(90),
      fontWeight: '600',
      color: theme.colors.white,
      alignSelf: 'center',
    },
    highLowTemp: {
      fontSize: theme.fontSize.font12,
      lineHeight: normalize(27),
      fontWeight: '400',
      color: theme.colors.white,
      opacity: theme.opacity.opacity8,
    },
    weatherText: {
      fontSize: theme.fontSize.font28,
      lineHeight: normalize(42),
      fontWeight: '400',
      color: theme.colors.white,
      alignSelf: 'center',
    },
    locationText: {
      fontSize: theme.fontSize.font22,
      lineHeight: normalize(33),
      fontWeight: '400',
      color: theme.colors.white,
    },
    locationIcon: {
      width: normalize(24),
      height: normalize(24),
      marginLeft: normalize(6),
    },
    flexRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    weatherAnimation: {
      flex: 0.7,
      marginTop: normalize(30),
    },
    flex0p5: {
      flex: 0.5,
    },
    justifyCenter: {
      justifyContent: 'center',
    },
    extraInfoContainer: {
      paddingHorizontal: normalize(12),
      paddingVertical: normalize(16),
      backgroundColor: hexToRgbA(theme.colors.black, 0.3),
      borderRadius: theme.borderRadius.radius12,
      width: (screenWidth - normalize(48)) / 2,
      marginTop: normalize(16),
      alignItems: 'center',
    },
    extrainfo: {flexWrap: 'wrap', justifyContent: 'space-between'},
    infoImage: {
      width: normalize(50),
      height: normalize(50),
    },
    sunRiseimage: {
      width: normalize(100),
      height: normalize(50),
    },
    extraInfoHeading: {
      fontSize: theme.fontSize.font16,
      lineHeight: normalize(18),
      fontWeight: '400',
      color: theme.colors.white,
    },
    extraInfoValue: {
      fontSize: theme.fontSize.font14,
      lineHeight: normalize(16),
      fontWeight: '400',
      color: theme.colors.white,
      marginTop: normalize(4),
    },
    searchIcon: {
      height: normalize(Platform.select({ios: 24, android: 34})),
      width: normalize(Platform.select({ios: 24, android: 34})),
      resizeMode: 'contain',
    },
    searchIconContainer: {
      padding: normalize(6),
      backgroundColor: hexToRgbA(theme.colors.white, 0.4),
      alignSelf: 'flex-end',
      borderRadius: theme.borderRadius.radius35,
      marginTop: normalize(16),
    },
    heading: {
      fontSize: theme.fontSize.font18,
      lineHeight: normalize(22),
      fontWeight: '400',
      color: theme.colors.white,
    },
    calendarIcon: {
      height: normalize(20),
      width: normalize(20),
      resizeMode: 'contain',
      marginRight: normalize(6),
    },
    weatherIcon: {
      width: normalize(44),
      height: normalize(44),
    },
    day: {
      fontSize: theme.fontSize.font16,
      lineHeight: normalize(22),
      fontWeight: '500',
      color: theme.colors.white,
      opacity: theme.opacity.opacity7,
      marginTop: normalize(8),
    },
    temp: {
      fontSize: theme.fontSize.font12,
      lineHeight: normalize(18),
      fontWeight: '400',
      color: theme.colors.white,
      marginTop: normalize(6),
    },
    mgt16: {marginTop: normalize(16)},
    forecastContainer: {
      backgroundColor: hexToRgbA(theme.colors.black, 0.3),
      width: (screenWidth - normalize(64)) / 3,
      marginRight: normalize(16),
      borderRadius: theme.borderRadius.radius12,
      paddingHorizontal: normalize(8),
      paddingVertical: normalize(16),
      justifyContent: 'center',
      alignItems: 'center',
    },
    spaceBetween: {
      justifyContent: 'space-between',
    },
    dateChanger: {
      color: theme.colors.white,
      width: normalize(Platform.OS == 'android' ? 18 : 10),
    },
    forcastDays: {
      color: theme.colors.white,
    },
    pb: {
      paddingBottom: normalize(24),
    },
  });
};
