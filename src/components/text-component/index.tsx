import {Text, TextProps, TextStyle} from 'react-native';
import React from 'react';
import {createStyleSheet} from './style';
import useAppTheme from '@theme/theme';

interface TextType extends TextProps {
  textStyle?: TextStyle;

  children?: React.ReactNode;
}

export const TextComponent = (props: TextType) => {
  const {theme} = useAppTheme();
  const {textStyle, children, ...restProps} = props;
  const styles = createStyleSheet(theme);
  return (
    <Text style={[styles.textStyle, textStyle]} {...restProps}>
      {children}
    </Text>
  );
};
