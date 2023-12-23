import React from "react";
import { Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { COLORS } from "../../../assets/theme";

type Props = {
  children: React.ReactNode;
  customStyles?: object;
  type?: "regular" | "medium" | "bold";
  onPress?: () => void;
};

export const RobotoText: React.FC<Props> = ({
  onPress,
  children,
  customStyles,
  type = "regular",
}) => {
  const [fontsLoaded] = useFonts({
    RobotoRegular: require("../../../assets/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("../../../assets/fonts/Roboto-Medium.ttf"),
    RobotoBold: require("../../../assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const fontStyles = fontTypeStyles[type] || fontTypeStyles.regular;

  return (
    <Text onPress={onPress} style={[fontStyles, styles.default, customStyles]}>
      {children}
    </Text>
  );
};

const fontTypeStyles = {
  regular: {
    fontFamily: "RobotoRegular",
  },
  medium: {
    fontFamily: "RobotoMedium",
  },
  bold: {
    fontFamily: "RobotoBold",
  },
};

const styles = StyleSheet.create({
  default: {
    color: COLORS.whiteText,
  },
});
