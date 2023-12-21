import React from "react";
import { View, StyleSheet } from "react-native";

import { DemoIconButton } from "./Demo/DemoIconButton";
import { CustomIcon } from "./CustomIcon";
import * as ImagePicker from "expo-image-picker";

import { COLORS, SPACING } from "../../assets/theme";

type Props = {
  onImageSelected: (uri: string) => void;
};

export const GalleryImageSelector: React.FC<Props> = ({ onImageSelected }) => {
  const pickImage = async () => {
    // Request media library permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need permissions to access your photos!");
      return;
    }

    // Launch the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    // If an image is selected, call the onImageSelected function with the image URI
    if (result) {
      if (result.assets) {
        onImageSelected(result.assets[0].uri);
      }
    }
  };

  return (
    <View style={styles.imagePickerContainer}>
      <DemoIconButton onPress={pickImage}>
        <CustomIcon
          library="Entypo"
          name="camera"
          size={SPACING.spacing30}
          color={COLORS.whiteText}
        />
      </DemoIconButton>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePickerContainer: {
    alignSelf: "flex-start",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: SPACING.spacing10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
