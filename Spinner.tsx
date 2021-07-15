import React, { useEffect, useRef } from 'react';
import { StyleProp, View, ViewStyle, Animated, Easing } from 'react-native';

const CIRCLE_RADIUS = 9999;

export const Spinner: React.VFC<{
  duration?: number | undefined | null;
  width?: number | undefined | null;
  color?: string | undefined | null;
  backgroundColor?: string | undefined | null;
  style?: StyleProp<ViewStyle>;
}> = ({
  duration: durationParam,
  width: widthParam,
  color: colorParam,
  backgroundColor: backgroundColorParam,
  style,
}) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  const duration = durationParam ?? 2000;
  const width = widthParam ?? 5;
  const color = colorParam ?? 'white';
  const backgroundColor = backgroundColorParam ?? 'rgba(255, 255, 255, 0.6)';

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 360,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [spinValue, duration]);

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
