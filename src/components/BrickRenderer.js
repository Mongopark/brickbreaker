import React from 'react';
import { View, StyleSheet } from 'react-native';

const BrickRenderer = ({ body, size, color }) => {
  const { position } = body;
  const { width, height } = size;

  const x = position.x - width / 2;
  const y = position.y - height / 2;

  const style = {
    position: 'absolute',
    left: x,
    top: y,
    width,
    height,
    backgroundColor: color,
  };

  return <View style={style} />;
};

const styles = StyleSheet.create({
  // Add styles if needed
});

export default BrickRenderer;
