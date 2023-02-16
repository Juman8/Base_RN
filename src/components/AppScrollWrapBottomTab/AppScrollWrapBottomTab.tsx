import {getStatusOfBottomTab, setStatus} from "@redux";
import {Box} from "@theme";
import React, {useEffect, useRef} from "react";
import {Animated, FlatList, StyleProp, ViewStyle} from "react-native";
import {getStatusBarHeight} from "react-native-status-bar-height";
import {useDispatch, useSelector} from "react-redux";
interface AppScrollWrapBottomTabProps {
  children: JSX.Element;
  style?: StyleProp<ViewStyle>;
  isHeightStatus?: boolean;
  ListHeaderComponent?: JSX.Element;
  ListFooterComponent?: JSX.Element;
}

const NewFlatList = Animated.createAnimatedComponent(FlatList);

export const AppScrollWrapBottomTab = (props: AppScrollWrapBottomTabProps) => {
  const scrollYOld = useRef(0);
  const refDebounce: any = useRef(null);
  const dispatch = useDispatch();
  const statusOfBottomTab = useSelector(getStatusOfBottomTab);

  useEffect(() => {
    dispatch(setStatus(true));
  }, []);

  const onScroll = (y: number) => {
    if (y < scrollYOld.current && !statusOfBottomTab) {
      dispatch(setStatus(true));
    } else if (y > scrollYOld.current && statusOfBottomTab) {
      dispatch(setStatus(false));
    }
    scrollYOld.current = y;
  };

  return (
    <Box width={'100%'} height="100%" >
      {props.ListHeaderComponent}
      <NewFlatList
        bounces={false}
        style={{marginTop: props.isHeightStatus ? getStatusBarHeight() : 0}}
        overScrollMode={"never"}
        contentContainerStyle={[props.style, {paddingBottom: getStatusBarHeight()}]}
        scrollEventThrottle={32}
        onScroll={(e) => {
          const y = e.nativeEvent.contentOffset.y;
          if (refDebounce.current) {
            clearTimeout(refDebounce.current);
          }
          refDebounce.current = setTimeout(() => {
            onScroll(y);
          }, 80);
        }}
        renderItem={() => {
          return (
            <Box style={{ flex: 1}}>
              {props.children}
            </Box>
          )
        }}
        data={[{}]}
        keyExtractor={() => "listRoot_Name"}
      />
      {props.ListFooterComponent}
    </Box>
  );
};