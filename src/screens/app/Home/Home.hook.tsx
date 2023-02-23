import {GlobalService} from "@components";
import {AppChangeLanguage} from "@instances";
import {useTheme} from "@theme";
import {dataHealthContent, firebaseSvc, LogApp} from '@utils';
import dayjs from "dayjs";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {AppButtonHome} from "./AppButtonHome";
import {ViewNote} from "./ViewNote";

export const useHookHome = () => {
  const {updateTheme} = useTheme();
  const {t} = useTranslation();
  const [isDark, setDark] = useState(true);
  const [value, setValue] = useState('');

  const [dataContent, setDataContent] = useState<dataHealthContent[]>([]);
  const [dataToday, setDataToDay] = useState<dataHealthContent>();
  const [monthFilter, setMonFilter] = useState<string>(dayjs().format('MM/YYYY'));

  useEffect(() => {
    GlobalService.hideLoading();
  }, []);
  const onSwitchLang = AppChangeLanguage();
  // const insets = useSafeAreaInsets();

  useEffect(() => {
    firebaseSvc.getListDataOfHealth((data) => {
      LogApp({data});
      setDataContent(data);
    });
  }, []);

  useEffect(() => {
    const subscription = firebaseSvc.onHandleDataChange((valueChange: dataHealthContent) => {
      setDataContent((prv: any) => {
        const isExit = prv.findIndex((el: dataHealthContent) => el.id === valueChange.id) !== -1;
        if (!isExit) {
          return prv.concat([valueChange]);
        } else {
          return prv.map((el: dataHealthContent) => {
            if (el.id === valueChange.id) {
              return {
                ...valueChange,
              };
            }
            return el;
          });
        }

      });
    });
    return () => subscription();
  }, []);


  const ListFooterComponent = React.useMemo((): JSX.Element => {
    return (
      <>
        <AppButtonHome />
        <ViewNote />
      </>
    );
  }, []);

  useEffect(() => {
    const subscription = firebaseSvc.onGetDataToday((valueChange: dataHealthContent) => {
      setDataToDay(valueChange);
    });
    return () => subscription();
  }, []);

  return {
    ListFooterComponent, setDark, isDark, updateTheme, onSwitchLang, value, setValue, t,
    dataContent,
    dataToday,
    monthFilter,
    setMonFilter
  };
};
