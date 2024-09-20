import {ThemeProps} from './themeTypes';

import {colors} from './colors';
import {borderRadius, borderWidth, opacity, size} from './fonts';
export default function useAppTheme() {
  const appTheme: ThemeProps = {
    fontSize: size,
    colors,
    opacity,
    borderRadius,
    borderWidth,
  };
  return {
    theme: appTheme,
  };
}
