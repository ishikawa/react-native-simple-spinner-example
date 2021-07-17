import React, { useEffect, useRef } from 'react';
import { useMemo } from 'react';
import { StyleSheet, StyleProp, View, ViewStyle, Animated, Easing, ColorValue } from 'react-native';

const CIRCLE_RADIUS = 9999;

export const Spinner: React.VFC<{
  animating?: boolean;
  hidesWhenStopped?: boolean;
  duration?: number;
  width?: number;
  color?: ColorValue;
  backgroundColor?: ColorValue;
  style?: StyleProp<ViewStyle>;
}> = (props) => {
  // Props
  const animating = props.animating ?? true;
  const hidesWhenStopped = props.hidesWhenStopped ?? true;
  const duration = props.duration ?? 2000;
  const width = props.width ?? 5;
  const color = props.color ?? 'white';
  const backgroundColor = props.backgroundColor ?? 'rgba(255, 255, 255, 0.6)';
  const style = StyleSheet.flatten(props.style);

  // Only size properties pulled from `style`
  const spinnerStyle: ViewStyle = {
    width: style.width,
    height: style.height,
  };

  const spinValue = useRef(new Animated.Value(0)).current;

  const loop = useMemo(
    () =>
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 360,
          duration,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ),
    [spinValue, duration]
  );

  useEffect(() => {
    if (animating) {
      spinValue.setValue(0);
      loop.start();
    } else {
      loop.stop();
    }
  }, [loop, animating]);

  const rotateValue = spinValue.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  // In Android, borderRadius + borderXXXWidth is not properly working.
  // To get around this problem, I use a wrapper view for spin.
  //
  // https://github.com/facebook/react-native/issues/9262
  return (
    <View style={style}>
      <View
        style={[
          {
            position: 'absolute',
            borderRadius: CIRCLE_RADIUS,
            borderColor: backgroundColor,
            borderWidth: width,
          },
          spinnerStyle,
        ]}></View>
      <Animated.View
        style={[
          {
            borderRadius: CIRCLE_RADIUS,
            borderColor: backgroundColor,
            borderTopColor: color,
            borderTopWidth: width,
            borderRightWidth: width,
            borderLeftWidth: width,
            transform: [{ rotate: rotateValue }],
          },
          spinnerStyle,
        ]}
      />
    </View>
  );
};
