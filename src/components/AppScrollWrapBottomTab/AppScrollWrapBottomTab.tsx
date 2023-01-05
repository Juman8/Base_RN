import {getStatusOfBottomTab, setStatus} from "@redux";
import React, {useRef} from "react";
import {Animated, FlatList, StyleProp, ViewStyle} from "react-native";
import {getStatusBarHeight} from "react-native-status-bar-height";
import {useDispatch, useSelector} from "react-redux";
interface AppScrollWrapBottomTabProps {
  children: JSX.Element;
  style?: StyleProp<ViewStyle>;
  isHeightStatus?: boolean;
}

const NewFlatlist = Animated.createAnimatedComponent(FlatList);

export const AppScrollWrapBottomTab = (props: AppScrollWrapBottomTabProps) => {
  const scrollYOld = useRef(0);
  const refDebounce: any = useRef(null);
  const dispatch = useDispatch();
  const statusOfBottomTab = useSelector(getStatusOfBottomTab)

  const onScroll = (y: number) => {
    if (y < scrollYOld.current && !statusOfBottomTab) {
      dispatch(setStatus(true));
    } else if (y > scrollYOld.current && statusOfBottomTab) {
      dispatch(setStatus(false));
    }
    scrollYOld.current = y;
  }

  return (
    <NewFlatlist 
      bounces={false}
      style={{marginTop: props.isHeightStatus ? getStatusBarHeight() + 10 : 0}}
      overScrollMode={"never"}
      contentContainerStyle={[props.style, {paddingBottom: 100}]}
      scrollEventThrottle={32}
      onScroll={(e) => {
        const y = e.nativeEvent.contentOffset.y
        if (refDebounce.current) {
          clearTimeout(refDebounce.current)
        }
        refDebounce.current = setTimeout(() => {
          onScroll(y)
        }, 80)
      }}
      renderItem={() => {
        return props.children;
      }}
      data={[{}]}
    />
  )
}