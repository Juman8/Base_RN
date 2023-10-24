import {IconMenu} from '@assets';
import {AppHeader, AppScrollWrapBottomTab} from '@components';
import {Box} from '@theme';
import {LogApp} from '@utils';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useHookHome} from './Home.hook';
dayjs.extend(customParseFormat);

const Home = () => {
  const {ListFooterComponent} = useHookHome();

  return (
    <>
      <AppScrollWrapBottomTab
        ListFooterComponent={ListFooterComponent}
        ListHeaderComponent={
          <>
            <AppHeader title="Dashboard" />
            <Box
              flexDirection={'row'}
              justifyContent="space-between"
              paddingVertical={'s'}
              paddingRight="s"
            >
              <Pressable
                style={styles.btn12}
                onPress={() => {
                  LogApp('USER_CLICKED');
                }}
              >
                <FastImage source={IconMenu} style={styles.img2} />
              </Pressable>
            </Box>
          </>
        }
        isHeightStatus={false}
      />
    </>
  );
};

const styles = StyleSheet.create({
  img1: {width: 15, height: 18, marginRight: 10},
  img2: {width: 18, height: 22},
  btn12: {flexDirection: 'row', alignItems: 'center'},
});

export {Home};
