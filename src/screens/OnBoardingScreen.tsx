import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ViewToken,
  StatusBar,
  FlatList,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { OnBoardingData, data } from "../../assets/constants/data";
import { OnBoardingPagination } from "../components/OnBoarding/onBoardingPagination";
import { OnBoardingNextButton } from "../components/OnBoarding/OnBoardingNextButton";
import { OnBoardingRenderItem } from "../components/OnBoarding/OnBoardingRenderItem";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedRef,
} from "react-native-reanimated";

import { COLORS, SPACING } from "../../assets/theme";
import { MainStackParams } from "../navigation/MainStackNavigator";

export type OnBoardingNavigationProps = NativeStackScreenProps<
  MainStackParams,
  "OnBoardingScreen"
>;

export const OnBoardingScreen: React.FC<OnBoardingNavigationProps> = ({
  navigation,
}) => {
  // Shared values for animation
  const flatListRef = useAnimatedRef<FlatList<OnBoardingData>>();
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  // Handler for onViewableItemsChanged event
  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems[0].index !== null) {
      flatListIndex.value = viewableItems[0].index;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.whiteSmoke} />

      <View style={styles.statusBarBg} />

      <Animated.FlatList
        ref={flatListRef}
        data={data}
        renderItem={({ item, index }) => (
          <OnBoardingRenderItem item={item} index={index} x={x} />
        )}
        keyExtractor={(item) => item.id.toString()}
        scrollEventThrottle={16} // ideal to work on animations
        horizontal={true}
        onScroll={onScroll}
        bounces={false}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        viewabilityConfig={{
          minimumViewTime: 300,
          viewAreaCoveragePercentThreshold: 10,
        }}
        onViewableItemsChanged={onViewableItemsChanged}
      />
      <View style={styles.bottomContainer}>
        <OnBoardingPagination data={data} x={x} />
        <OnBoardingNextButton
          flatListRef={flatListRef}
          flatListIndex={flatListIndex}
          dataLength={data.length}
          navigation={navigation}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.indigoDye,
  },
  // TODO:Not sure about the color tho
  statusBarBg: {
    backgroundColor: COLORS.black,
    height: 70,
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
  },
  bottomContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    bottom: 15,
    left: 0,
    right: 0,
    marginHorizontal: SPACING.spacing30,
    paddingVertical: SPACING.spacing30,
  },
});
