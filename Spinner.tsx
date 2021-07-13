import React from 'react';
import { StyleSheet, StyleProp, View, ViewStyle } from 'react-native';

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
          borderRadius: 9999,
          borderColor: backgroundColor,
          borderTopWidth: width,
          borderRightWidth: width,
          borderBottomWidth: width,
          borderLeftWidth: width,
          borderTopColor: color,
        },
        style,
      ]}></View>
  );
};
