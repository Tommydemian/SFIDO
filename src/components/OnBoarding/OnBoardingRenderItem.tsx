import { StyleSheet, View, Dimensions, StatusBar } from "react-native";
import React from "react";
import { Data } from "../../../assets/constants/data";
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import { NunitoText } from "../Fonts/NunitoText";
import { BORDER, COLORS, FONT_SIZE, SPACING } from "../../../assets/theme";

type RenderItemProps = {
  item: Data;
  index: number;
  offSetX: Animated.SharedValue<number>;
};

// RenderItem component for rendering each onboarding item
export const OnBoardingRenderItem: React.FC<RenderItemProps> = ({
  item,
  index,
  offSetX,
}) => {
  const SCREEN_WIDTH = Dimensions.get("screen").width;
  const SCREEN_HEIGHT = Dimensions.get("screen").height;

  // ANIMATED STYLES
  // Animated styles for image
  const imageAnimatedStyle = useAnimatedStyle(() => {
    // Interpolation for opacity and translateY based on scroll offset
    const opacityAnimation = interpolate(
      offSetX.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [0, 1, 0],
      Extrapolation.CLAMP,
    );
    //
    const translateYAnimation = interpolate(
      offSetX.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [100, 0, 100],
      Extrapolation.CLAMP,
    );

    return {
      opacity: opacityAnimation,
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT * 0.55,
      transform: [{ translateY: translateYAnimation }],
      resizeMode: "cover",
    };
  });

  // Animated styles for text
  const textAnimationStyle = useAnimatedStyle(() => {
    // Interpolation for opacity and translateY based on scroll offset
    const opacityAnimation = interpolate(
      offSetX.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [0, 1, 0],
      Extrapolation.CLAMP,
    );
    const translateYAnimation = interpolate(
      offSetX.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [100, 0, 100],
      Extrapolation.CLAMP,
    );

    return {
      opacity: opacityAnimation,
      transform: [{ translateY: translateYAnimation }],
    };
  });

  return (
    <View style={[styles.itemContainer, { width: SCREEN_WIDTH }]}>
      <StatusBar barStyle={"default"} />
      <Animated.Image source={item.image} style={[imageAnimatedStyle]} />
      <Animated.View style={textAnimationStyle}>
        <NunitoText type="bold" customStyles={styles.itemTitle}>
          {item.title}
        </NunitoText>
        <NunitoText customStyles={styles.itemText}>{item.text}</NunitoText>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    justifyContent: "center",
    rowGap: SPACING.spacing10,
    alignItems: "center",
    backgroundColor: COLORS.indigoDye,
    paddingHorizontal: SPACING.spacing30,
  },
  itemTitle: {
    color: COLORS.whiteText,
    fontSize: FONT_SIZE.onBoardingTitle,
    textAlign: "center",
    marginBottom: SPACING.spacing10,
  },
  itemText: {
    color: COLORS.whiteText,
    fontSize: FONT_SIZE.onBoardingDesc,
    lineHeight: 24,
  },
});
