import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { COLORS } from '../../assets/theme';

type Props = {
  children: React.ReactNode;
  customStyles?: object;
  onPress?: () => void;
};

export const YungJakesText: React.FC<Props> = ({
  onPress,
  children,
  customStyles,
}) => {
  const [fontsLoaded] = useFonts({
    YungJakesTextRegular: require('../../assets/fonts/YungJakesNewHandwriting-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Text
      onPress={onPress}
      style={[
        { fontFamily: 'YungJakesTextRegular' },
        styles.default,
        customStyles,
      ]}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  default: {
    color: COLORS.whiteText,
  },
});
