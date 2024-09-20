import {Image, ImageProps, ImageStyle} from 'react-native';

export interface ImageCompProps extends ImageProps {
  style?: ImageStyle;
  isUrl?: boolean;
  uri?: string;
  hide?: boolean;
}

export const ImageComponent = (props: ImageCompProps) => {
  const {style, isUrl = false, source, uri, ...remainingProps} = props;

  let src = source;

  if (isUrl) {
    src = {uri};
  }
  return <Image source={src} style={style} {...remainingProps} />;
};
