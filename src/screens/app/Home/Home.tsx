import {LoveIcon, Spacing} from '@assets';
import {
  AppButton,
  AppInput,
  AppScrollWrapBottomTab,
  GlobalService, VirtualList
} from '@components';
import {AppchangeLanguage} from '@instances';
import {getStatusOfBottomTab} from '@redux';
import {useTheme} from '@theme';
import {ENUM_LANGUAGE} from '@translations';
import i18next from 'i18next';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Animated, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSelector} from "react-redux";

const NewBtnAnimated = Animated.createAnimatedComponent(TouchableOpacity)

const data = [
  {
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
  },
];

// type Props = StackScreenProps<RootStackParamList, 'NewsDetailScreen'>;

const TOP = 40 + Spacing.width25;
const BOTTOM = Spacing.width25 - 10;

const Home = () => {
  /* use navigation: props.navigation
    hoặc khai báo const route = useRoute<RouteProp<RootStackParamList, SCREEN_ROUTE.HOME>>();
    use route: props.route
    hoặc khai báo const navigation = useNavigation<NavigationProp<RootStackParamList, SCREEN_ROUTE.HOME>>();
    không sử dụng các function được khai báo trong file NavigationUtils.tsx khi đang ở trong các component có thể truy cập navigation prop. 
    Các function đấy được dùng trong trường hợp 'navigate without prop navigation'
  */
  const {updateTheme} = useTheme();
  const {t} = useTranslation();
  const [isDark, setDark] = useState(true);
  const [value, setValue] = useState('');
  const statusOfBottomTab = useSelector(getStatusOfBottomTab);
  const translateY = useRef(new Animated.Value(50 + Spacing.width25)).current;

  useEffect(() => {
    GlobalService.hideLoading();
  }, []);
  const onSwitchLang = AppchangeLanguage();
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
  }, [statusOfBottomTab])

  const intA = translateY.interpolate({
    inputRange: [BOTTOM,TOP],
    outputRange: [BOTTOM,TOP],
    extrapolate:'clamp'
  })

  const ListFooterComponent = (): JSX.Element => {
    return (
      <NewBtnAnimated
        style={[{
          bottom: intA, 
        }, styles.btnLove]}
      >
        <LoveIcon
          width={Spacing.width25}
          height={Spacing.width25}
        />
      </NewBtnAnimated>
    )
  }

  return (
    <AppScrollWrapBottomTab isHeightStatus
      ListFooterComponent={<ListFooterComponent />}
    >
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
              <AppInput
                value={value}
                onChangeText={setValue}
                placeholder="OKOKOKO"
                label={'OKOKOK'}
              />
            </>
          );
        }}
      />
    </AppScrollWrapBottomTab>
  );
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

export {Home};
