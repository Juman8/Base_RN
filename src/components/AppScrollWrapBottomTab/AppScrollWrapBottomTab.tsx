import React, {useRef} from "react";
import {Animated, FlatList, NativeScrollEvent, NativeSyntheticEvent, StyleProp, ViewStyle} from "react-native";
import {getStatusBarHeight} from "react-native-status-bar-height";
import reactotron from "reactotron-react-native";
interface AppScrollWrapBottomTabProps {
  children: any;
  style?: StyleProp<ViewStyle>;
  isHeightStatus?: boolean;
}

const NewFlatlist = Animated.createAnimatedComponent(FlatList);

export const AppScrollWrapBottomTab = (props: AppScrollWrapBottomTabProps) => {
  const scrollYOld = useRef(0);

  return (
    <NewFlatlist 
      bounces={false}
      style={{marginTop: props.isHeightStatus ? getStatusBarHeight() + 10 : 0}}
      overScrollMode={"never"}
      contentContainerStyle={[props.style, {paddingBottom: 100}]}
      scrollEventThrottle={32}
      onScroll={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
        // const { } = e.nativeEvent;
        reactotron.log!({aa: e.nativeEvent});
      }}
      renderItem={() => {
        return props.children;
      }}
      data={[{}]}
    />
  )
}