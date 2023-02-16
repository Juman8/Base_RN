import {
  AppButton,
  AppInput,
  AppScrollWrapBottomTab,
  GlobalService, VirtualList
} from '@components';
import {ENUM_LANGUAGE} from '@translations';
import i18next from 'i18next';
import React from 'react';
import {StyleSheet} from 'react-native';
import {useHookHome} from './Home.hook';

// type Props = StackScreenProps<RootStackParamList, 'NewsDetailScreen'>;



const Home = () => {

  const {ListFooterComponent, setDark, isDark, updateTheme, onSwitchLang, value, setValue, t, dataContent} = useHookHome();
  console.log({dataContent})
  return (
    <AppScrollWrapBottomTab isHeightStatus
      ListFooterComponent={<ListFooterComponent />}
    >
      <VirtualList
        data={dataContent}
        renderItem={() => {
          return (
            <>
              <AppButton
                style={styles.btn1}
                label={t('switchTheme')}
                isWrap
                onPress={() => {
                  setDark(!isDark);
                  updateTheme(!isDark);
                }}
              />
              <AppButton
                label={t('switchLang')}
                isWrap
                onPress={() => {
                  GlobalService.showLoading();
                  onSwitchLang(
                    i18next.language === ENUM_LANGUAGE.vi
                      ? ENUM_LANGUAGE.en
                      : ENUM_LANGUAGE.vi,
                  );
                  setTimeout(() => {
                    GlobalService.hideLoading();
                  }, 1000);
                }}
              />
              <AppInput
                value={value}
                onChangeText={setValue}
                placeholder="OKOKOKO"
                label={'OKOKOK'}
              />
            </>
          );
        }}
        emptyText={"Data is Empty!"}
      />
    </AppScrollWrapBottomTab>
  );
};

const styles = StyleSheet.create({
  btn1: {marginBottom: 20},
});

export {Home};
