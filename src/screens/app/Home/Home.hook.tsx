import {GlobalService} from '@components';
import {AppChangeLanguage} from '@instances';
// import {authApi} from '@redux';
import {useTheme} from '@theme';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {AppButtonHome} from './AppButtonHome';
import {ViewNote} from './ViewNote';

export const useHookHome = () => {
  const {updateTheme} = useTheme();
  const {t} = useTranslation();
  const [isDark, setDark] = useState(true);
  const [value, setValue] = useState('');

  // RTK QUERY
  // const {data, isLoading} = authApi.useGetListDataQuery();

  useEffect(() => {
    GlobalService.hideLoading();
  }, []);
  const onSwitchLang = AppChangeLanguage();
  // const insets = useSafeAreaInsets();

  const ListFooterComponent = React.useMemo((): JSX.Element => {
    return (
      <>
        <AppButtonHome />
        <ViewNote />
      </>
    );
  }, []);

  return {
    ListFooterComponent,
    setDark,
    isDark,
    updateTheme,
    onSwitchLang,
    value,
    setValue,
    t,
  };
};
