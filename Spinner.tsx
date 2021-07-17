import React, { useEffect, useRef } from 'react';
import { useMemo } from 'react';
import { StyleProp, View, ViewStyle, Animated, Easing, ColorValue } from 'react-native';

const CIRCLE_RADIUS = 9999;

export const Spinner: React.VFC<{
  animating?: boolean;
  duration?: number | undefined | null;
  width?: number | undefined | null;
  color?: ColorValue | undefined | null;
  backgroundColor?: ColorValue | undefined | null;
  style?: StyleProp<ViewStyle>;
}> = ({
  animating: animatingProp,
  duration: durationProp,
  width: widthProp,
  color: colorProp,
  backgroundColor: backgroundColorProp,
  style,
}) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  const animating = animatingProp ?? true;
  const duration = durationProp ?? 2000;
  const width = widthProp ?? 5;
  const color = colorProp ?? 'white';
  const backgroundColor = backgroundColorProp ?? 'rgba(255, 255, 255, 0.6)';

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
    <View>
      <View
        style={[
          {
            position: 'absolute',
            borderRadius: CIRCLE_RADIUS,
            borderColor: backgroundColor,
            borderWidth: width,
          },
          style,
        ]}></View>
      <Animated.View
        style={[
          {
            borderRadius: CIRCLE_RADIUS,
            borderColor: backgroundColor,
            borderTopWidth: width,
            borderTopColor: color,
            borderRightWidth: width,
            borderLeftWidth: width,
            transform: [{ rotate: rotateValue }],
          },
          style,
        ]}
      />
    </View>
  );
};
