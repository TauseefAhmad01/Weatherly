import {View} from 'react-native';
import React from 'react';
import {createStyleSheet} from './style';
import useAppTheme from '@theme/theme';
import LottieView from 'lottie-react-native';
import cloudy from '@utils/Json/cloudy.json';
import loader from '@utils/Json/whiteLoader.json';

interface LoadingProps {
  isLoading?: boolean;
  showOverlay?: boolean;
}

export const Loader = (props: LoadingProps) => {
  const {isLoading = false, showOverlay = false} = props || {};
  const {theme} = useAppTheme();
  const styles = createStyleSheet(theme);
  return (
    <>
      {isLoading && (
        <View style={[styles.container, !showOverlay && styles.bgcolor]}>
          <LottieView
            loop
            source={cloudy}
            autoPlay
            style={styles.cloudyAnimation}
          />

          <LottieView
            speed={1.2}
            resizeMode="cover"
            source={loader}
            autoPlay
            loop
            style={styles.loader}
          />
        </View>
      )}
    </>
  );
};
