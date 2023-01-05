import React, {useCallback, useMemo} from 'react';
import {lightTheme, darkTheme} from './themeMode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ThemeProvider as ReStyleThemeProvider,
  createText,
  createBox,
  useTheme as useReTheme,
  createTheme,
} from '@shopify/restyle';
import {FontWithBold_Barlow, FontWithBold_PingFang} from './fontWithBold';
import {StorageConstant} from '@types';
import {StatusBar} from 'react-native';
import {Spacing} from './appSpacing';
import {FontSize} from './fontSize';
import {LogApp} from '@utils';
const theme = createTheme({
  dark: false,
  colors: {
    ...darkTheme.colors,
  },
  spacing: {
    sm: Spacing.width4,
    s: Spacing.width8,
    xs: Spacing.width10,
    m: Spacing.width16,
    l: Spacing.width24,
    xl: Spacing.width40,
  },
  borderRadii: {
    s: Spacing.width4,
    m: Spacing.width10,
    l: Spacing.width25,
    xl: Spacing.width75,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    title1: {
      fontSize: FontSize.Font24,
      color: 'textColor',
    },
    title2: {
      fontSize: FontSize.Font18,
      color: 'textColor',
    },
    title3: {
      fontSize: FontSize.Font16,
      color: 'textColor',
    },
    body: {
      fontSize: FontSize.Font16,
      color: 'textColor',
      ...FontWithBold_PingFang.Bold_PingFang_500,
    },
    button: {
      fontSize: FontSize.Font15,
      color: 'textColor',
      textAlign: 'center',
      ...FontWithBold_Barlow.Bold_Barlow_600,
    },
    header: {
      fontSize: FontSize.Font12,
      color: 'textColor',
    },
    text: {
      fontSize: FontSize.Font14,
      ...FontWithBold_Barlow.Light_Barlow_400,
      color: 'textColor',
    },
  },
});
export type Theme = typeof theme;

export const Box = createBox<Theme>();
export const Text = createText<Theme>();
export const ThemeAppContext = React.createContext({
  updateTheme: (isLight: boolean) => {
    LogApp("CHANGE_THEME", isLight + "");
  },
});

export const ThemeProvider = ({children}: any) => {
  const Dark = useMemo(() => {
    return {
      ...theme,
      colors: darkTheme.colors,
    };
  }, []);
  const Light = useMemo(() => {
    return {
      ...theme,
      colors: lightTheme.colors,
    };
  }, []);
  const [themeApp, setTheme] = React.useState(Dark);

  const onUpDateTheme = useCallback(
    (isLightTheme?: boolean) => {
      setTheme(isLightTheme ? Light : Dark);
      if (isLightTheme) {
        AsyncStorage.setItem(StorageConstant.THEME, 'THEME_SET_SUCCESS');
        StatusBar.setBarStyle('dark-content');
      } else {
        StatusBar.setBarStyle('light-content');
        AsyncStorage.removeItem(StorageConstant.THEME);
      }
    },
    [Dark, Light],
  );

  const onChangeTheme = React.useCallback(async () => {
    const oldSaveValue =
      (await AsyncStorage.getItem(StorageConstant.THEME)) || '';
    onUpDateTheme(oldSaveValue !== '');
  }, [onUpDateTheme]);

  React.useEffect(() => {
    onChangeTheme();
  }, [onChangeTheme]);

  return (
    <ThemeAppContext.Provider
      value={{
        updateTheme: (isLight: boolean) => {
          onUpDateTheme(isLight);
        },
      }}
    >
      <ReStyleThemeProvider theme={themeApp}>{children}</ReStyleThemeProvider>
    </ThemeAppContext.Provider>
  );
};

export const useThemeApp = () => useReTheme();

export enum TEXT_ENUM {
  'title1' = 'title1',
  'title2' = 'title2',
  'title3' = 'title3',
  'body' = 'body',
  'button' = 'button',
  'header' = 'header',
  'text' = 'text',
}
