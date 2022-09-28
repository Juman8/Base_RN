import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Box, useTheme} from '@theme';
import {AppButton, AppInput, AppScrollWrapBottomTab, GlobalService, LargeList, VirtualList} from '@components';
import {AppchangeLanguage} from '@instances';
import {ENUM_LANGUAGE} from '@translations';
import {useTranslation} from 'react-i18next';
import i18next from 'i18next';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const data = [{
  name: 1,
  id: 1,
},
  {
    name: 1,
    id: 2,
  },
  {
    name: 1,
    id: 3,
  },
  {
    name: 1,
    id: 4,
  },
  {
    name: 1,
    id: 5,
  }]

const Home = () => {
  const {updateTheme} = useTheme();
  const {t} = useTranslation();
  const [isDark, setDark] = useState(true);
  const [value, setValue] = useState('');

  useEffect(() => {
    GlobalService.hideLoading();
  }, []);
  const onSwitchLang = AppchangeLanguage();
  const insets = useSafeAreaInsets();

  return (
    <AppScrollWrapBottomTab isHeightStatus>
      <VirtualList
        data={data}
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
              <AppInput value={value} onChangeText={setValue} placeholder="OKOKOKO"
                label={"OKOKOK"}
              />
            </>
          )
        }}
      />

    </AppScrollWrapBottomTab>
  );
};

const styles = StyleSheet.create({
  btn1: {marginBottom: 20},
});

export {Home};
