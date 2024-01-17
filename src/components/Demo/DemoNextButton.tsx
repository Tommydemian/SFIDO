import { StyleSheet, View } from "react-native";
import React from "react";
import { NunitoText } from "../Fonts/NunitoText";
import { SubmitButton } from "../SubmitButton";
import { DemoMediaNavigationProps } from "../../screens/DemoCreateMessageMediaScreen";
import { DemoTextNavigationProps } from "../../screens/DemoCreateMessageTextScreen";
import { COLORS, SPACING } from "../../../assets/theme";

type Props = {
  type: "text" | "media";
  navigation:
    | DemoMediaNavigationProps["navigation"]
    | DemoTextNavigationProps["navigation"];
};

export const DemoNextButton: React.FC<Props> = ({ type, navigation }) => {
  const handlePress = () => {
    if (type === "text") {
      navigation.navigate("DemoCreateMessageMediaScreen");
    } else {
      navigation.navigate("DemoPreviewMessageScreen");
    }
  };
  return type === "text" ? (
    <SubmitButton customStyles={styles.nextButton} onPress={handlePress}>
      <NunitoText type="bold" customStyles={styles.nextButtonText}>
        Next
      </NunitoText>
    </SubmitButton>
  ) : (
    <View style={styles.nextButtonContainer}>
      <SubmitButton customStyles={styles.nextButton} onPress={handlePress}>
        <NunitoText type="bold" customStyles={styles.nextButtonText}>
          Next
        </NunitoText>
      </SubmitButton>
    </View>
  );
};

const styles = StyleSheet.create({
  nextButtonContainer: {
    paddingBottom: SPACING.spacing20,
  },
  nextButton: {
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    position: "absolute",
    bottom: SPACING.nextButtonBottom,
    width: SPACING.nextButtonWidth,
    alignSelf: "center",
  },
  nextButtonText: {
    textAlign: "center",
    color: COLORS.white,
  },
});
