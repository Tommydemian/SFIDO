import React from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { COLORS } from "../../../assets/theme";

type Props = {
  index: number;
  x: SharedValue<number>;
};

export const Dot: React.FC<Props> = ({ index, x }) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const animatedDotStyle = useAnimatedStyle(() => {
    const isActive = x.value === index * SCREEN_WIDTH;
    const backgroundColor = isActive ? COLORS.folly : COLORS.onBoardingDot;

    const widthAnimation = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [10, 20, 10],
      Extrapolate.CLAMP,
    );
    const opacityAnimation = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [0.5, 1, 0.5],
      Extrapolate.CLAMP,
    );

    return {
      width: widthAnimation,
      opacity: opacityAnimation,
      backgroundColor: backgroundColor,
    };
  });

  return <Animated.View style={[styles.dot, animatedDotStyle]} />;
};

const styles = StyleSheet.create({
  dot: {
    width: 10,
    height: 10,
    marginHorizontal: 10,
    borderRadius: 100,
  },
});
