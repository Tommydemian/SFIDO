import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SubmitButton } from "../SubmitButton";
import { NunitoText } from "../Fonts/NunitoText";
import { COLORS, SPACING } from "../../../assets/theme";
import { PostTextNavigationProps } from "../../screens/PostMessageTextScreen";
import { PostMediaNavigationProps } from "../../screens/PostMessageMediaScreen";

type Props = {
  type: "text" | "media";
  navigation:
    | PostTextNavigationProps["navigation"]
    | PostMediaNavigationProps["navigation"];
  customStyles?: object;
};

export const NextButton: React.FC<Props> = ({
  type,
  navigation,
  customStyles,
}) => {
  const handlePress = () => {
    if (type === "text") {
      navigation.navigate("PostMessageMediaScreen");
    } else {
      navigation.navigate("PostMessageScreen");
    }
  };

  return (
    <SubmitButton
      customStyles={[styles.nextButton, customStyles]}
      onPress={handlePress}
    >
      <NunitoText type="bold" customStyles={styles.nextButtonText}>
        Next
      </NunitoText>
    </SubmitButton>
  );
};

const styles = StyleSheet.create({
  nextButton: {
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    position: "absolute",
    bottom: 61,
    width: SPACING.nextButtonWidth,
    alignSelf: "center",
  },
  nextButtonText: {
    textAlign: "center",
    color: COLORS.white,
  },
});
