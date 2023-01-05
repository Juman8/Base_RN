import {NoAvatar} from '@assets';
import React from 'react';
import {StyleProp} from 'react-native';
import {ImageStyle, ResizeMode} from 'react-native-fast-image';
import {AppImage} from '../AppImage/AppImage';

interface propsImage {
  uri: string;
  style?: StyleProp<ImageStyle>;
  resizeMode?: ResizeMode;
}

const AppAvatar = React.memo((props: propsImage) => {
  const {uri, style, resizeMode} = props;
  return (
    <AppImage
      uri={uri}
      defaultSource={NoAvatar}
      style={style}
      resizeMode={resizeMode}
      checkNetworking
    />
  );
});

export {AppAvatar};
