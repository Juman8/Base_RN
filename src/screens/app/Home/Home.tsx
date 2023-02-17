import {
  AppScrollWrapBottomTab
} from '@components';
import {LogApp} from '@utils';
import React from 'react';
import {StyleSheet} from 'react-native';
import {ChartHome} from './ChartHome';
import {useHookHome} from './Home.hook';
// type Props = StackScreenProps<RootStackParamList, 'NewsDetailScreen'>;

const Home = () => {

  const {ListFooterComponent, setDark, isDark, updateTheme, onSwitchLang, value, setValue, t, dataContent} = useHookHome();
  LogApp({dataContent});
  return (
    <AppScrollWrapBottomTab isHeightStatus
      ListFooterComponent={<ListFooterComponent />}
    >
      <ChartHome dataContent={dataContent} />
    </AppScrollWrapBottomTab>
  );
};

const styles = StyleSheet.create({
  btn1: {marginBottom: 20},
});

export {Home};
