import {IconApple, IconFacebook, IconGG} from '@assets';
import {TYPE_BTN_SOCIAL} from '@constants';
import {APP_SOCIAL_TYPES} from '@models';
import {Spacing} from '@theme';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useModel} from './AppLoginSocial.hook';

export const AppLoginSocial = (props: APP_SOCIAL_TYPES) => {
  const {type} = props;
  const {onPressSocial} = useModel(props);

  const renderIcon = () => {
    switch (type) {
      case TYPE_BTN_SOCIAL.GOOGLE: {
        return <IconGG width={Spacing.height17} height={Spacing.height17} />;
      }
      case TYPE_BTN_SOCIAL.FACEBOOK: {
        return (
          <IconFacebook width={Spacing.height17} height={Spacing.height17} />
        );
      }
      default: {
        return <IconApple width={Spacing.height17} height={Spacing.height17} />;
      }
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPressSocial}>
      {renderIcon()}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    width: Spacing.width44,
    height: Spacing.width44,
    borderRadius: Spacing.width44,
    borderWidth: 1,
    borderColor: '#EFF0F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
