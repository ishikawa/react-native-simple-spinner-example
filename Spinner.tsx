import React, { useEffect, useMemo, useRef } from 'react';
import { StyleSheet, StyleProp, View, ViewStyle, Animated, Easing, ColorValue } from 'react-native';

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
  return (
    <View style={style}>
      {animating || !hidesWhenStopped ? (
        <Animated.View
          style={[
            {
              borderRadius: 9999,
              borderColor: backgroundColor,
              borderTopColor: color,
              borderWidth: width,
              transform: [{ rotate: rotateValue }],
            },
            spinnerStyle,
          ]}
        />
      ) : null}
    </View>
  );
};
