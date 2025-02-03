/* eslint-disable @typescript-eslint/no-explicit-any */
import PropTypes from 'prop-types';
import React, {useCallback, useRef, useState} from 'react';
import {
  Animated,
  Easing,
  GestureResponderEvent,
  I18nManager,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import {radius, styles} from './styles';

interface RippleProps {
  rippleColor?: string;
  rippleOpacity?: number;
  rippleDuration?: number;
  rippleSize?: number;
  rippleContainerBorderRadius?: number;
  rippleCentered?: boolean;
  rippleSequential?: boolean;
  rippleFades?: boolean;
  disabled?: boolean;
  onRippleAnimation?: (
    animation: Animated.CompositeAnimation,
    callback?: () => void,
  ) => void;
  onPress?: (event: GestureResponderEvent) => void;
  onLongPress?: (event: GestureResponderEvent) => void;
  onPressIn?: (event: GestureResponderEvent) => void;
  onPressOut?: (event: GestureResponderEvent) => void;
  children?: React.ReactNode;
  style?: ViewStyle;
}

const Ripple: React.FC<RippleProps> = React.memo(
  ({
    rippleColor = 'rgb(0, 0, 0)',
    rippleOpacity = 0.3,
    rippleDuration = 400,
    rippleSize = 0,
    rippleContainerBorderRadius = 0,
    rippleCentered = false,
    rippleSequential = false,
    rippleFades = true,
    disabled = false,
    onRippleAnimation = (animation: any, callback: any) =>
      animation.start(callback),
    onPress,
    onLongPress,
    onPressIn,
    onPressOut,
    children,
    style,
  }) => {
    const [ripples, setRipples] = useState<any[]>([]);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const uniqueRef = useRef(0);

    const onLayout = (event: any) => {
      const {width: newWidth, height: newHeight} = event.nativeEvent.layout;
      setWidth(newWidth);
      setHeight(newHeight);
    };

    const startRipple = useCallback(
      (event: GestureResponderEvent) => {
        const w2 = 0.5 * width;
        const h2 = 0.5 * height;

        const {locationX, locationY} = rippleCentered
          ? {locationX: w2, locationY: h2}
          : event.nativeEvent;

        const offsetX = Math.abs(w2 - locationX);
        const offsetY = Math.abs(h2 - locationY);
        const R =
          rippleSize > 0
            ? 0.5 * rippleSize
            : Math.sqrt((w2 + offsetX) ** 2 + (h2 + offsetY) ** 2);

        const newRipple = {
          unique: uniqueRef.current++,
          progress: new Animated.Value(0),
          locationX,
          locationY,
          R,
        };

        const animation = Animated.timing(newRipple.progress, {
          toValue: 1,
          easing: Easing.out(Easing.ease),
          duration: rippleDuration,
          useNativeDriver: true,
        });

        onRippleAnimation(animation, () => {
          setRipples(prevRipples => prevRipples.slice(1));
        });

        setRipples(prevRipples => [...prevRipples, newRipple]);
      },
      [
        width,
        height,
        rippleCentered,
        rippleSize,
        rippleDuration,
        onRippleAnimation,
      ],
    );

    const handlePress = (event: GestureResponderEvent) => {
      if (!rippleSequential || ripples.length === 0) {
        onPress?.(event);
        startRipple(event);
      }
    };

    const renderRipple = ({unique, progress, locationX, locationY, R}: any) => {
      const rippleStyle = {
        top: locationY - radius,
        [I18nManager.isRTL ? 'right' : 'left']: locationX - radius,
        backgroundColor: rippleColor,
        transform: [
          {
            scale: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0.5 / radius, R / radius],
            }),
          },
        ],
        opacity: rippleFades
          ? progress.interpolate({
              inputRange: [0, 1],
              outputRange: [rippleOpacity, 0],
            })
          : rippleOpacity,
      };
      return (
        <Animated.View style={[styles.ripple, rippleStyle]} key={unique} />
      );
    };

    return (
      <TouchableWithoutFeedback
        onLayout={onLayout}
        onPress={handlePress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onLongPress={onLongPress}
        disabled={disabled}>
        <Animated.View style={style} pointerEvents="box-only">
          {children}
          <View
            style={[
              styles.container,
              {borderRadius: rippleContainerBorderRadius},
            ]}>
            {ripples.map(renderRipple)}
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  },
);

Ripple.propTypes = {
  rippleColor: PropTypes.string,
  rippleOpacity: PropTypes.number,
  rippleDuration: PropTypes.number,
  rippleSize: PropTypes.number,
  rippleContainerBorderRadius: PropTypes.number,
  rippleCentered: PropTypes.bool,
  rippleSequential: PropTypes.bool,
  rippleFades: PropTypes.bool,
  disabled: PropTypes.bool,
  onRippleAnimation: PropTypes.func,
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
  onPressIn: PropTypes.func,
  onPressOut: PropTypes.func,
  children: PropTypes.node,
  style: PropTypes.object,
};

Ripple.displayName = 'Ripple';

export {Ripple};
