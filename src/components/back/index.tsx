import {TouchableOpacity, ViewStyle} from 'react-native';
import React from 'react';
import {createStyleSheet} from './style';
import useAppTheme from '@theme/theme';
import {useNavigation} from '@react-navigation/native';
import {ImageComponent} from '@components/image-component';
import {back} from '@assets/images';

interface gobackProps {
  viewStyle?: ViewStyle;
}
export const BackComponent = (props: gobackProps) => {
  const {viewStyle} = props || {};
  const {theme} = useAppTheme();
  const navigation = useNavigation();
  const styles = createStyleSheet(theme);

  const handlePress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.container, viewStyle]}>
      <ImageComponent source={back} style={styles.image} />
    </TouchableOpacity>
  );
};
