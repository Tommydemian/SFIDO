import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import { DemoIconButton } from "./Demo/DemoIconButton";
import { CustomIcon } from "./CustomIcon";
import * as ImagePicker from "expo-image-picker";

import { COLORS, ICON_SIZE, SPACING } from "../../assets/theme";
import { CarouselItem, ImageItem } from "../types";
import { useSharedValue } from "react-native-reanimated";

type Props = {
  onImageSelected: (uri: string) => void;
  imageList: CarouselItem[];
  setImageList: React.Dispatch<React.SetStateAction<ImageItem[]>>;
};

export const GalleryImageSelector: React.FC<Props> = ({
  onImageSelected,
  imageList,
  setImageList,
}) => {
  const wasPressed = useSharedValue(false);
  const [wasPressedJs, setWasPressedJs] = useState(false);

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
        const newUri = result.assets[0].uri;
        onImageSelected(newUri);
        const newImageItem = { id: Date.now(), uri: newUri };
        setImageList([...imageList, newImageItem]);
        setWasPressedJs(true);
        wasPressed.value = true;
      }
    }
  };

  return (
    <View style={styles.imagePickerContainer}>
      <DemoIconButton wasPressed={wasPressed}>
        <CustomIcon
          library="Feather"
          name="image"
          size={ICON_SIZE.default}
          color={wasPressedJs ? COLORS.white : COLORS.folly}
          onPress={pickImage}
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
