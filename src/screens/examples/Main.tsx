import {IconMenu, Spacing} from '@assets';
import {AppCheckBox, AppText} from '@components';
import {Box} from '@theme';
import React from 'react';
import {Pressable} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ListComponentExample} from './ListComponent';

enum TYPE_DATA {
  LIST = 'list',
  CHECK_BOX = 'checkbox',
}

export const ComponentExample = () => {
  const [typeData, setType] = React.useState<TYPE_DATA | null>(TYPE_DATA.LIST);

  const renderExample = () => {
    switch (typeData) {
      case TYPE_DATA.LIST: {
        return <ListComponentExample />;
      }
      case TYPE_DATA.CHECK_BOX: {
        return (
          <Box justifyContent={'center'} flexDirection="row">
            <AppCheckBox
              isChecked={true}
              handleToggle={() => {}}
              label={'HELLO'}
            />
          </Box>
        );
      }
      default:
        return null;
    }
  };
  const onPressItem = (type: TYPE_DATA) => {
    setType(type);
  };
  return (
    <>
      <Pressable
        onPress={() => {
          if (typeData) {
            setType(null);
          }
        }}
      >
        <FastImage
          source={IconMenu}
          style={{width: 20, height: 20, marginLeft: Spacing.width15}}
        />
      </Pressable>
      {renderExample()}
      {!typeData && (
        <Box alignItems={'center'} marginHorizontal="l">
          <AppText onPress={() => onPressItem(TYPE_DATA.LIST)}>
            LIST COMPONENT
          </AppText>
          <AppText onPress={() => onPressItem(TYPE_DATA.CHECK_BOX)}>
            CHECK BOX
          </AppText>
        </Box>
      )}
    </>
  );
};
