import { StyleSheet, View } from "react-native";
import React from "react";
import { NunitoText } from "../Fonts/NunitoText";
import { HandWithPen } from "../HandWithPenSvg";
import { COLORS, FONT_SIZE, SPACING } from "../../../assets/theme";

type Props = {
  children: React.ReactNode;
};

export const DemoScreenTitle: React.FC<Props> = ({ children }) => {
  return (
    <View style={styles.screenTitleContainer}>
      <NunitoText type="bold" customStyles={styles.screenTitle}>
        {children}
      </NunitoText>
      <HandWithPen />
    </View>
  );
};

const styles = StyleSheet.create({
  screenTitleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.spacing50,
    zIndex: 300,
  },
  screenTitle: {
    color: COLORS.whiteText,
    fontSize: FONT_SIZE.screenTitle,
    marginRight: SPACING.spacing5,
  },
});
