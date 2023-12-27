import React from "react";
import { Text, StyleSheet, TextProps } from "react-native";
import { useFonts } from "expo-font";
import { COLORS } from "../../../assets/theme";

type Props = TextProps & {
  children: React.ReactNode;
  customStyles?: object;
  type?: "regular" | "semiBold" | "bold" | "semiBoldItalic" | "boldItalic";
  onPress?: () => void;
};

export const NunitoText: React.FC<Props> = ({
  onPress,
  children,
  customStyles,
  type = "regular",
  ...rest
}) => {
  const [fontsLoaded] = useFonts({
    NunitoRegular: require("../../../assets/fonts/Nunito-Regular.ttf"),
    NunitoSemiBold: require("../../../assets/fonts/Nunito-SemiBold.ttf"),
    NunitoSemiBoldItalic: require("../../../assets/fonts/Nunito-SemiBoldItalic.ttf"),
    NunitoBold: require("../../../assets/fonts/Nunito-Bold.ttf"),
    NunitoBoldItalic: require("../../../assets/fonts/Nunito-BoldItalic.ttf"),
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
    fontFamily: "NunitoRegular",
  },
  semiBold: {
    fontFamily: "NunitoSemiBold",
  },
  bold: {
    fontFamily: "NunitoBold",
  },
  semiBoldItalic: {
    fontFamily: "NunitoSemiBold",
  },
  boldItalic: {
    fontFamily: "NunitoBold",
  },
};

const styles = StyleSheet.create({
  default: {
    color: COLORS.whiteText,
  },
});
