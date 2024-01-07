import React from "react";
import { Text, StyleSheet, TextProps } from "react-native";
import { useFonts } from "expo-font";
import { COLORS } from "../../../assets/theme";

type Props = TextProps & {
  children: React.ReactNode;
  customStyles?: object;
  onPress?: () => void;
};

export const BebasNeueText: React.FC<Props> = ({
  onPress,
  children,
  customStyles,
  ...rest
}) => {
  const [fontsLoaded] = useFonts({
    BebasNeueRegular: require("../../../assets/fonts/BebasNeue-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Text
      onPress={onPress}
      {...rest}
      style={[{ fontFamily: "BebasNeueRegular" }, styles.default, customStyles]}
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
