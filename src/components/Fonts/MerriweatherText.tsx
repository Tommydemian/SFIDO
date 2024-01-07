import React from "react";
import { Text, StyleSheet, TextProps } from "react-native";
import { useFonts } from "expo-font";
import { COLORS } from "../../../assets/theme";

type Props = TextProps & {
  children: React.ReactNode;
  customStyles?: object;
  type?: "regular" | "bold";
  onPress?: () => void;
};

export const MerriweatherText: React.FC<Props> = ({
  onPress,
  children,
  customStyles,
  type = "regular",
  ...rest
}) => {
  const [fontsLoaded] = useFonts({
    MerriweatherRegular: require("../../../assets/fonts/Merriweather-Regular.ttf"),
    MerriweatherBold: require("../../../assets/fonts/Merriweather-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const fontStyles = fontTypeStyles[type] || fontTypeStyles.regular;

  return (
    <Text
      onPress={onPress}
      {...rest}
      style={[fontStyles, styles.default, customStyles]}
    >
      {children}
    </Text>
  );
};

const fontTypeStyles = {
  regular: {
    fontFamily: "MerriweatherRegular",
  },
  bold: {
    fontFamily: "MerriweatherBold",
  },
};

const styles = StyleSheet.create({
  default: {
    color: COLORS.whiteText,
  },
});
