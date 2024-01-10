import { StyleSheet, View } from "react-native";
import React from "react";
import { NunitoText } from "../Fonts/NunitoText";
import { SubmitButton } from "../SubmitButton";
import { DemoMediaNavigationProps } from "../../screens/DemoCreateMessageMediaScreen";
import { DemoTextNavigationProps } from "../../screens/DemoCreateMessageTextScreen";
import { SPACING } from "../../../assets/theme";

type Props = {
  type: "text" | "media";
  navigation:
    | DemoMediaNavigationProps["navigation"]
    | DemoTextNavigationProps["navigation"];
  selectedImage?: string;
  text?: string;
  videoId?: string;
};

export const DemoNextButton: React.FC<Props> = ({
  type,
  navigation,
  selectedImage,
  videoId,
  text,
}) => {
  const handlePress = () => {
    if (type === "text") {
      navigation.navigate("DemoCreateMessageMediaScreen");
    } else {
      navigation.navigate("DemoPreviewMessageScreen", {
        image: selectedImage!,
        text: text!,
        videoId: videoId!,
      });
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
    width: 111,
    alignSelf: "center",
  },
  nextButtonText: {
    textAlign: "center",
    color: "#fff",
  },
});
