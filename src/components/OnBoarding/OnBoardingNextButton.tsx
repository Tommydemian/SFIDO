import React from "react";
import { StyleSheet, Pressable, FlatList } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useFonts } from "expo-font";
import { AntDesign } from "@expo/vector-icons";
import { COLORS, SPACING } from "../../../assets/theme";
import { OnBoardingData } from "../../../assets/constants/data";
import { OnBoardingNavigationProps } from "../../screens/OnBoardingScreen";

type Props = {
  flatListRef: React.RefObject<FlatList<OnBoardingData>>;
  flatListIndex: SharedValue<number>;
  dataLength: number;
  navigation: OnBoardingNavigationProps["navigation"];
};

export const OnBoardingNextButton: React.FC<Props> = ({
  dataLength,
  flatListIndex,
  flatListRef,
  navigation,
}) => {
  const arrowAnimationStyle = useAnimatedStyle(() => {
    const isLastSlide = flatListIndex.value === dataLength - 1;
    return {
      width: 30,
      height: 30,
      opacity: isLastSlide ? withTiming(0) : withTiming(1),
      transform: [
        {
          translateX: isLastSlide ? withTiming(100) : withTiming(0),
        },
      ],
    };
  });

  // Animated styles for button
  const buttonAnimationStyle = useAnimatedStyle(() => {
    return {
      width:
        flatListIndex.value === dataLength - 1
          ? withSpring(120)
          : withSpring(60),
      height: 60,
    };
  });

  const textAnimationStyle = useAnimatedStyle(() => {
    const isLastSlide = flatListIndex.value === dataLength - 1;
    return {
      opacity: isLastSlide ? withTiming(1) : withTiming(0),
      transform: [
        { translateX: isLastSlide ? withTiming(0) : withTiming(-100) },
      ],
    };
  });

  const handlePress = () => {
    if (flatListIndex.value < dataLength - 1) {
      flatListRef.current?.scrollToIndex({ index: flatListIndex.value + 1 });
    } else {
      navigation.navigate("CategoriesSelectionScreen");
    }
  };

  //return null at last
  const [fontsLoaded] = useFonts({
    NunitoRegular: require("../../../assets/fonts/Nunito-Regular.ttf"),
    NunitoSemiBold: require("../../../assets/fonts/Nunito-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Pressable onPress={handlePress}>
      <Animated.View style={[styles.container, buttonAnimationStyle]}>
        <Animated.Text
          style={[
            styles.textButton,
            textAnimationStyle,
            { fontFamily: "NunitoSemiBold" },
          ]}
        >
          Get Started!
        </Animated.Text>
        <Animated.View style={[styles.arrowIcon, arrowAnimationStyle]}>
          <AntDesign
            name="arrowright"
            size={SPACING.spacing30}
            color={COLORS.whiteText}
          />
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.folly,
    padding: SPACING.spacing10,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    width: 60,
    height: 60,
  },
  arrowIcon: {
    position: "absolute",
  },
  textButton: {
    fontSize: 16,
    position: "absolute",
    color: COLORS.whiteText,
  },
});
