export interface typeOfColors {
  background: string;
  color_Tab_Unselected: string;
  color_Tab_Selected: string;
  icon: string;
  backgroundColorTab: string;
  color_Icon_Selected: string;
  textColor: string;
  whiteColor: string;
  colorDisable: string;
  primary: string;
  placeHolderColor: string;
  red: string;
  divider: string;
  transparent: string;
  black_half_part: string;
}

export enum ENUM_COLORS {
  background = 'background',
  color_Tab_Unselected = 'color_Tab_Unselected',
  color_Tab_Selected = 'color_Tab_Selected',
  icon = 'icon',
  backgroundColorTab = 'backgroundColorTab',
  color_Icon_Selected = 'color_Icon_Selected',
  textColor = 'textColor',
  whiteColor = 'whiteColor',
  colorDisable = 'colorDisable',
  primary = 'primary',
  placeHolderColor = 'placeHolderColor',
  red = 'red',
  divider = 'divider',
  transparent = 'transparent',
  black_half_part = 'black_half_part',
}

type themeType = {
  dark: boolean;
  colors: typeOfColors;
};

export const darkTheme: themeType = {
  // default
  dark: true,
  colors: {
    background: '#111214',
    color_Tab_Unselected: '#5F5F5F',
    color_Tab_Selected: '#DCE0E5',
    icon: '#FFF',
    backgroundColorTab: '#262626',
    color_Icon_Selected: '#F2CA24',
    textColor: '#fff',
    whiteColor: '#fff',
    colorDisable: '#c0c0c0',
    primary: '#4d4fdb',
    red: '#ff667d',
    placeHolderColor: '#B4B4B4',
    divider: '#262626',
    transparent: 'transparent',
    black_half_part: 'rgba(0,0,0,0.5)',
  },
};

export const lightTheme: themeType = {
  dark: false,
  colors: {
    background: '#fff',
    color_Tab_Unselected: '#d4d4d4',
    color_Tab_Selected: '#ffffff',
    icon: '#FFF',
    backgroundColorTab: '#c4c4c4',
    color_Icon_Selected: '#F2CA24',
    textColor: '#000',
    whiteColor: '#fff',
    colorDisable: '#c0c0c0',
    primary: '#4d4fdb',
    red: '#ff667d',
    placeHolderColor: '#B4B4B4',
    divider: '#cfcfcf',
    transparent: 'transparent',
    black_half_part: 'rgba(0,0,0,0.5)',
  },
};
