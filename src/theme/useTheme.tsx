import {useContext} from 'react';
import {typeOfColors} from './themeMode';
import {ThemeAppContext, useThemeApp} from './themeSetting';

export const useTheme = () => {
  const theme: {colors: typeOfColors;} = useThemeApp();
  const {updateTheme} = useContext(ThemeAppContext);
  return {
    theme,
    themeColor: theme.colors,
    updateTheme,
  };
};
