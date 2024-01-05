import { StyleSheet, View } from "react-native";
import React from "react";
import { SubmitButton } from "../SubmitButton";
import { NunitoText } from "../Fonts/NunitoText";
import { GalleryImageSelector } from "../GalleryImageSelector";

type Props = {
  handleWriteMyOwn: () => void;
  handleImageSelected?: (uri: string) => void;
};

export const DemoMessageCreationActions: React.FC<Props> = ({
  handleImageSelected,
  handleWriteMyOwn,
}) => {
  return (
    <View style={styles.actionsContainer}>
      <View style={styles.submitButtonContainer}>
        {/* Button to clean the Text input */}
        <View
          style={{
            flexDirection: "column",
            alignContent: "center",
          }}
        >
          <SubmitButton onPress={handleWriteMyOwn}>
            <NunitoText customStyles={styles.buttonText} type="bold">
              Write My Message
            </NunitoText>
          </SubmitButton>
        </View>
      </View>

      {/* Image Selector */}
      <GalleryImageSelector onImageSelected={handleImageSelected} />
    </View>
  );
};

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  submitButtonContainer: {
    width: "60%",
  },
  buttonText: {
    textAlign: "center",
  },
});
