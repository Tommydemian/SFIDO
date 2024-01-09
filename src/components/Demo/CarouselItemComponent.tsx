import {
  StyleSheet,
  Pressable,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import Animated, {
  withTiming,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { CarouselItem } from "../../types";
import { BORDER, COLORS, SPACING } from "../../../assets/theme";

type Props = {
  x: SharedValue<number>;
  SIZE: number;
  SPACER: number;
  SCREEN_WIDTH: number;
  index: number;
  item: CarouselItem;
  selectedImage: string;
  handleSelectImage: (uri: string) => void;
};

export const CarouselItemComponent: React.FC<Props> = ({
  x,
  SIZE,
  index,
  item,
  SPACER,
  SCREEN_WIDTH,
  selectedImage,
  handleSelectImage,
}) => {
  const scaleAnimation = useAnimatedStyle(() => {
    const scale = interpolate(
      x.value,
      [(index - 1.5) * SIZE, (index - 0.5) * SIZE, (index + 0.5) * SIZE],
      [0.8, 1, 0.8],
    );
    return {
      transform: [{ scale }],
    };
  });

  return (
    <View
      style={[
        {
          width: SIZE,
          marginHorizontal: SPACING.spacing5,
        },
        styles.shadow,
      ]}
    >
      <Animated.View
        style={[
          scaleAnimation,
          { width: SIZE },
          item.uri === selectedImage && styles.selectedImageStyle,
        ]}
      >
        <Pressable onPress={() => handleSelectImage(item.uri)}>
          <Image
            source={{ uri: item.uri }}
            style={[
              styles.modalselectedImage,
              {
                width: SIZE,
                height: SCREEN_WIDTH * 1.1,
                borderRadius: BORDER.border30,
              },
            ]}
          />
        </Pressable>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
    backgroundColor: COLORS.ghostWhite,
    borderRadius: BORDER.border30,
    overflow: "hidden",
    shadowColor: COLORS.white,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  normalShadowStyle: {},
  modalselectedImage: {
    resizeMode: "cover",
  },
  shadow: {
    shadowColor: "#000000", // Black color
    shadowOffset: { width: 0, height: 4 }, // X and Y offset of the shadow
    shadowOpacity: 0.25, // Opacity of the shadow
    shadowRadius: 4, // Blur radius of the shadow
    elevation: 4, // For Android elevation of the shadow
  },
  // TODO:ANimated shadow
  selectedImageStyle: {
    alignItems: "center",
    backgroundColor: COLORS.ghostWhite,
    borderRadius: BORDER.border30,
    shadowColor: COLORS.white,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 1,
    elevation: 3,
  },
});
