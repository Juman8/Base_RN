import {StyleProp, ViewStyle} from "react-native";

export type iconProps = {
  width?: number;
  height?: number;
  iconFillColor?: string;
  style?: StyleProp<ViewStyle>;
  isActive?: boolean;
  strokeWidth?: number;
  strokeColor?: string;
};
