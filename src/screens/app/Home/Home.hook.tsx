import {GlobalService} from '@components';
import {AppChangeLanguage} from '@instances';
import {apiCustomize, Axios} from '@redux';
// import {authApi} from '@redux';
import {useTheme} from '@theme';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {AppButtonHome} from './AppButtonHome';
import {ViewNote} from './ViewNote';
let api = null;
export const useHookHome = () => {
  const {updateTheme} = useTheme();
  const {t} = useTranslation();
  const [isDark, setDark] = useState(true);
  const [value, setValue] = useState('');

  // RTK QUERY
  // const {data, isLoading} = authApi.useGetListDataQuery();

  const apiCall = () => {
    api = Axios.get('https://jsonplaceholder.typicode.com/users').subscribe(
      da => {
        console.log(da);
      },
    );
  };

  const apiCustomev2 = () => {
    apiCustomize
      .callApi('get', 'https://jsonplaceholder.typicode.com/users')
      .subscribe(v => {
        console.log(v);
      });
  };

  useEffect(() => {
    apiCustomev2();
    // apiCall();
    // apiCall();
    // apiCall();
    // apiCall();
    // apiCall();
    // apiCall();
    // apiCall();
  }, []);

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
