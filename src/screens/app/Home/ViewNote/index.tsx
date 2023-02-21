/* eslint-disable @typescript-eslint/no-explicit-any */
import {BackIcon} from '@assets';
import {AppText} from '@components';
import {Box, useTheme} from '@theme';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, Pressable} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {ENUM_COLORS_CHART} from '../ChartHome';

const NewBoxAnimated = Animated.createAnimatedComponent(Box);

const ViewItem = ({label, color}: {label: string; color: ENUM_COLORS_CHART;}) => {
  return (
    <Box flexDirection={"row"} alignItems="center">
      <Box width={6} height={6} style={{backgroundColor: color}} mr="s" />
      <AppText style={{color: color}}>{label}</AppText>
    </Box>
  );
};
export const ViewNote = () => {
  const {themeColor} = useTheme();
  const refTranslate = useRef(new Animated.Value(0)).current;
  const refWidthViewContent: any = useRef(90);
  const isHIde: any = useRef(false);
  const arrAnimated: any = useRef();
  const [hide, setHIde] = useState(false);
  const isHIdeState: any = useRef(false);

  const onPressIcon = () => {
    if (isHIdeState.current) clearTimeout(isHIdeState.current);
    isHIdeState.current = setTimeout(() => setHIde(prv => !prv), 300);
    if (arrAnimated.current) {
      arrAnimated.current.stop();
    }
    if (!isHIde.current) {
      arrAnimated.current = Animated.timing(refTranslate, {
        toValue: refWidthViewContent.current,
        duration: 300,
        useNativeDriver: true
      });
    } else {
      arrAnimated.current = Animated.timing(refTranslate, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      });
    }
    arrAnimated.current.start();
    isHIde.current = !isHIde.current;

  };

  const refRotate = refTranslate.interpolate({
    inputRange: [0, refWidthViewContent.current],
    outputRange: [1, 0],
    extrapolate: "clamp"
  });

  return (
    <NewBoxAnimated position={"absolute"} right={0} top={getStatusBarHeight() + 80} paddingVertical={"s"} borderTopLeftRadius="s" borderBottomLeftRadius={"s"} paddingRight="s"
      style={{
        backgroundColor: `${themeColor.backgroundColorTab}99`,
        transform: [{
          translateX: refTranslate
        }]
      }}
      flexDirection="row"
      alignItems={"center"}
      onLayout={(e) => {
        refWidthViewContent.current = e.nativeEvent.layout.width - 28;
      }}
    >
      <Pressable onPress={onPressIcon}>
        <Box
          style={{
            transform: [{
              rotate: hide ? '180deg' : '0deg'
            }]
          }}
        >
          <BackIcon fill={"#ffffff99"} />
        </Box>
      </Pressable>
      <NewBoxAnimated style={{opacity: refRotate}}>
        <ViewItem label={"Before"} color={ENUM_COLORS_CHART.BEFORE} />
        <ViewItem label={"After 1h"} color={ENUM_COLORS_CHART.AFTER_1h} />
        <ViewItem label={"After 2h"} color={ENUM_COLORS_CHART.AFTER_2h} />
      </NewBoxAnimated>
    </NewBoxAnimated>
  );
};