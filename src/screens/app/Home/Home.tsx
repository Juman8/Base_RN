import {AppHeader, AppScrollWrapBottomTab} from '@components';
import {ComponentExample} from '@examples';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {useHookHome} from './Home.hook';
import {IconMenu, Spacing} from '@assets';

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
          </>
        }
        isHeightStatus={false}
      >
        <ComponentExample />
      </AppScrollWrapBottomTab>
    </>
  );
};

export {Home};
