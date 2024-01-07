import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { CarouselItem, SpacerItem } from "../../types";
import { BORDER, COLORS, SPACING } from "../../../assets/theme";

type Props = {
  x: SharedValue<number>;
  SIZE: number;
  SPACER: number;
  SCREEN_WIDTH: number;
  index: number;
  item: CarouselItem;
  handleImageSelect: (uri: string) => void;
};

export const CarouselItemComponent: React.FC<Props> = ({
  x,
  SIZE,
  index,
  item,
  SPACER,
  SCREEN_WIDTH,
  handleImageSelect,
}) => {
  const isSpacerItem = (item: CarouselItem): item is SpacerItem => {
    return (item as SpacerItem).key !== undefined;
  };

  const scaleAnimation = useAnimatedStyle(() => {
    const scale = interpolate(
      x.value,
      [(index - 2) * SIZE, (index - 1) * SIZE, index * SIZE],
      [0.8, 1, 0.8],
    );
    return {
      transform: [{ scale }],
    };
  });

  if (isSpacerItem(item)) {
    return <View style={{ width: SPACER }} />;
  }

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
        style={[styles.imageContainer, scaleAnimation, { width: SIZE }]}
      >
        <TouchableOpacity onPress={() => handleImageSelect(item.uri)}>
          <Image
            source={item.uri}
            style={[
              styles.modalselectedImage,
              { width: SIZE, height: SCREEN_WIDTH * 1.2 },
            ]}
          />
        </TouchableOpacity>
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
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15, // Solo para Android
  },
  modalselectedImage: {
    resizeMode: "cover",
  },
  shadow: {
    shadowColor: COLORS.claret,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.7,
    shadowRadius: 15,
    elevation: 15, // Solo para Android
  },
});
