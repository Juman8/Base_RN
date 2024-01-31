import {getStatusOfBottomTab, setStatus} from '@redux';
import {Box, rootStyle} from '@theme';
import React, {useEffect, useMemo, useRef} from 'react';
import {Animated, FlatList, StyleProp, ViewStyle} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {useDispatch, useSelector} from 'react-redux';
interface AppScrollWrapBottomTabProps {
  children?: JSX.Element;
  style?: StyleProp<ViewStyle>;
  isHeightStatus?: boolean;
  ListHeaderComponent?: JSX.Element;
  ListFooterComponent?: JSX.Element;
}

const NewFlatList = Animated.createAnimatedComponent(FlatList);

// ANIMATED SCROLL FOR HIDE BOTOTM BAR
export const AppScrollWrapBottomTab = React.memo(
  (props: AppScrollWrapBottomTabProps) => {
    const scrollYOld = useRef(0);
    const refDebounce = useRef<NodeJS.Timeout>();
    const dispatch = useDispatch();
    const statusOfBottomTab = useSelector(getStatusOfBottomTab);

    useEffect(() => {
      dispatch(setStatus(true));
    }, [dispatch]);

    const onScroll = (y: number) => {
      if (y < scrollYOld.current && !statusOfBottomTab) {
        dispatch(setStatus(true));
      } else if (y > scrollYOld.current && statusOfBottomTab) {
        dispatch(setStatus(false));
      }
      scrollYOld.current = y;
    };

    const marginTop = useMemo(() => {
      return props.isHeightStatus ? getStatusBarHeight() : 0;
    }, [props.isHeightStatus]);

    return (
      <Box width={'100%'} height="100%">
        {props.ListHeaderComponent}
        <NewFlatList
          bounces={false}
          style={{marginTop}}
          overScrollMode={'never'}
          contentContainerStyle={[{paddingBottom: getStatusBarHeight()}]}
          scrollEventThrottle={32}
          onScroll={e => {
            const y = e.nativeEvent.contentOffset.y;
            if (refDebounce.current) {
              clearTimeout(refDebounce.current);
            }
            refDebounce.current = setTimeout(() => {
              onScroll(y);
            }, 10);
          }}
          renderItem={() => {
            return (
              <Box style={[rootStyle.container, props.style]}>
                {props.children}
              </Box>
            );
          }}
          data={[{}]}
          keyExtractor={() => 'listRoot_Name'}
        />
        {props.ListFooterComponent}
      </Box>
    );
  },
);
