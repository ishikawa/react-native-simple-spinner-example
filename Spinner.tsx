import React from 'react';
import { StyleSheet, StyleProp, View, ViewStyle } from 'react-native';

const CIRCLE_RADIUS = 9999;

export const Spinner: React.VFC<{
  width?: number | undefined | null;
  color?: string | undefined | null;
  backgroundColor?: string | undefined | null;
  style?: StyleProp<ViewStyle>;
}> = ({ width: widthParam, color: colorParam, backgroundColor: backgroundColorParam, style }) => {
  const width = widthParam ?? 5;
  const color = colorParam ?? 'white';
  const backgroundColor = backgroundColorParam ?? 'rgba(255, 255, 255, 0.6)';

  return (
    <View
      style={[
        {
          borderRadius: CIRCLE_RADIUS,
          borderColor: backgroundColor,
          borderTopWidth: width,
          borderTopColor: color,
          borderRightWidth: width,
          borderBottomWidth: width,
          borderLeftWidth: width,
        },
        style,
      ]}></View>
  );
};

export const SpinnerAndroid: React.VFC<{
  width?: number | undefined | null;
  color?: string | undefined | null;
  backgroundColor?: string | undefined | null;
  style?: StyleProp<ViewStyle>;
}> = ({ width: widthParam, color: colorParam, backgroundColor: backgroundColorParam, style }) => {
  const width = widthParam ?? 5;
  const color = colorParam ?? 'white';
  const backgroundColor = backgroundColorParam ?? 'rgba(255, 255, 255, 0.6)';

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
      <View
        style={[
          {
            borderRadius: CIRCLE_RADIUS,
            borderColor: backgroundColor,
            borderTopWidth: width,
            borderTopColor: color,
            borderRightWidth: width,
            borderLeftWidth: width,
          },
          style,
        ]}></View>
    </View>
  );
};
