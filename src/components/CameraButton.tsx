import { StyleSheet, Pressable, PressableProps } from 'react-native';
import React, { useState } from 'react';

import { Entypo } from '@expo/vector-icons';
import { COLORS, SPACING } from '../../assets/theme';

export const CameraButton: React.FC<PressableProps> = ({ ...rest }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  return (
    <Pressable
      {...rest}
      style={({ pressed }) => [
        styles.buttonContainer,
        {
          backgroundColor: pressed ? COLORS.folly : COLORS.whiteText,
          elevation: pressed ? 6 : 2,
          borderWidth: 1,
          borderColor: pressed ? COLORS.folly : COLORS.blackBg,
        },
      ]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Entypo
        name="camera"
        size={24}
        color={isPressed ? COLORS.whiteText : COLORS.black}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    padding: SPACING.spacing15,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
