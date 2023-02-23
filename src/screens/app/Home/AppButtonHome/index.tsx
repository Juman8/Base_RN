import {LoveIcon} from "@assets";
import {navigate, SCREEN_ROUTE} from "@navigation";
import {getStatusOfBottomTab} from "@redux";
import {Spacing} from "@theme";
import React, {useRef, useEffect} from "react";
import {Animated, StyleSheet, TouchableOpacity} from "react-native";
import {useSelector} from "react-redux";

const TOP = 40 + Spacing.width25;
const BOTTOM = Spacing.width25 - 10;
const NewBtnAnimated = Animated.createAnimatedComponent(TouchableOpacity);

export const AppButtonHome = () => {
  const statusOfBottomTab = useSelector(getStatusOfBottomTab);
  const translateY = useRef(new Animated.Value(50 + Spacing.width25)).current;

  const intA = translateY.interpolate({
    inputRange: [BOTTOM, TOP],
    outputRange: [BOTTOM, TOP],
    extrapolate: 'clamp'
  });


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
  }, [statusOfBottomTab]);

  return (
    <NewBtnAnimated
      style={[{
        bottom: intA,
      }, styles.btnLove]}
      onPress={() => navigate(SCREEN_ROUTE.HEAR_RATE, {isToday: true})}
    >
      <LoveIcon
        width={Spacing.width25}
        height={Spacing.width25}
      />
    </NewBtnAnimated>
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