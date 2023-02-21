import {LoveIcon, Spacing} from "@assets";
import {GlobalService} from "@components";
import {AppChangeLanguage} from "@instances";
import {getStatusOfBottomTab} from "@redux";
import {useTheme} from "@theme";
import React, {useState, useRef, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {Animated, StyleSheet, TouchableOpacity} from "react-native";
import {useSelector} from "react-redux";
import {dataHealthContent, firebaseSvc, LogApp} from '@utils';
import {navigate, SCREEN_ROUTE} from "@navigation";
import {ViewNote} from "./ViewNote";

const TOP = 40 + Spacing.width25;
const BOTTOM = Spacing.width25 - 10;
const NewBtnAnimated = Animated.createAnimatedComponent(TouchableOpacity);

export const useHookHome = () => {
  const {updateTheme} = useTheme();
  const {t} = useTranslation();
  const [isDark, setDark] = useState(true);
  const [value, setValue] = useState('');
  const statusOfBottomTab = useSelector(getStatusOfBottomTab);
  const translateY = useRef(new Animated.Value(50 + Spacing.width25)).current;

  const [dataContent, setDataContent] = useState<dataHealthContent[]>([]);
  const [dataToday, setDataToDay] = useState<dataHealthContent>();

  useEffect(() => {
    GlobalService.hideLoading();
  }, []);
  const onSwitchLang = AppChangeLanguage();
  // const insets = useSafeAreaInsets();

  useEffect(() => {
    if (statusOfBottomTab) {
      Animated.timing(translateY, {
        toValue: TOP,
        duration: 500,
        useNativeDriver: false
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: BOTTOM,
        duration: 500,
        useNativeDriver: false
      }).start();
    }
  }, [statusOfBottomTab]);

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

  const intA = translateY.interpolate({
    inputRange: [BOTTOM, TOP],
    outputRange: [BOTTOM, TOP],
    extrapolate: 'clamp'
  });

  const ListFooterComponent = React.useMemo((): JSX.Element => {
    return (
      <>
        <NewBtnAnimated
          style={[{
            bottom: intA,
          }, styles.btnLove]}
          onPress={() => navigate(SCREEN_ROUTE.HEAR_RATE, {dataContent: dataToday})}
        >
          <LoveIcon
            width={Spacing.width25}
            height={Spacing.width25}
          />
        </NewBtnAnimated>
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
    dataToday
  };
};

const styles = StyleSheet.create({
  btn1: {marginBottom: 20},
  btnLove: {
    position: 'absolute',
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 10,
    borderRadius: 100,
  }
});