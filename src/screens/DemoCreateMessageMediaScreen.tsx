import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Keyboard,
  FlatList,
  Pressable,
  useWindowDimensions,
} from "react-native";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  withTiming,
  useDerivedValue,
} from "react-native-reanimated";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { VideoLinkInput } from "../components/VideoLinkInput";

import { BORDER, COLORS, SPACING } from "../../assets/theme";

import { useCraftMessageContext } from "../contexts/CraftMessageContext";
import { DemoStackParams } from "../navigation/DemoStackNavigator";
import { GalleryImageSelector } from "../components/GalleryImageSelector";

import { CarouselItem } from "../types";
import { CarouselItemComponent } from "../components/Demo/CarouselItemComponent";
import { AbsoluteFillBgImage } from "../components/AbsoluteFillBgImage";
import { CustomIcon } from "../components/CustomIcon";
import { CustomBottomSheet } from "../components/CustomBottomSheet";
import { useBottomSheet } from "../hooks/useBottomSheet";
import { CraftMessageHeader } from "../components/Demo/CraftMessageHeader";
import { ImageCarouselComponent } from "../components/Demo/ImageCarouselComponent";
import { DemoNextButton } from "../components/Demo/DemoNextButton";

export type DemoMediaNavigationProps = NativeStackScreenProps<
  DemoStackParams,
  "DemoCreateMessageMediaScreen"
>;

export const DemoCreateMessageMediaScreen: React.FC<
  DemoMediaNavigationProps
> = ({ navigation }) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const SIZE = SCREEN_WIDTH * 0.7;
  const SPACER = (SCREEN_WIDTH - SIZE) / 2;
  const x = useSharedValue(0);

  const [snapPoint] = useState("20%");

  const { handleOpen, isBottomSheetVisible, setIsBottomSheetVisible } =
    useBottomSheet();

  const {
    videoId,
    text,
    selectedImage,
    setSelectedImage,
    imageList,
    setImageList,
  } = useCraftMessageContext();

  const flatListRef = useRef<FlatList<CarouselItem>>(null);
  const isVideoIdPresent = useSharedValue(false);

  useEffect(() => {
    videoId === ""
      ? (isVideoIdPresent.value = false)
      : (isVideoIdPresent.value = true);
  }, [videoId, isVideoIdPresent]);

  const backgroundColor = useDerivedValue(() => {
    return isVideoIdPresent.value ? COLORS.folly : COLORS.white;
  });

  const iConContainerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(backgroundColor.value, {
        duration: 300,
      }),
    };
  });

  // useEffect(() => {
  //   if (imageList.length > 1) {
  //     flatListRef.current?.scrollToIndex({
  //       index: imageList.length - 1,
  //       animated: true,
  //     });
  //   }
  // }, [imageList]);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  const handleSelectImage = (uri: string) => {
    setSelectedImage(uri);
  };

  // const getItemLayout = (_data, index: number) => ({
  //   length: SIZE * 1.1, // El largo de cada ítem es SIZE
  //   offset: SIZE * index, // El desplazamiento de cada ítem es su índice multiplicado por SIZE
  //   index,
  // });

  // const onImageSelected = (uri: string) => {
  //   initialImagesArr.push(uri);
  // };

  useEffect(() => {
    console.log(videoId !== "");
  }, [videoId]);

  return (
    <GestureHandlerRootView style={styles.flex1}>
      <TouchableOpacity
        style={styles.flex1}
        activeOpacity={1}
        onPress={() => Keyboard.dismiss()}
      >
        <SafeAreaView style={styles.container}>
          <AbsoluteFillBgImage imageKey="vector" />

          <View style={styles.spacer} />
          <CraftMessageHeader
            navigation={navigation}
            title="Include a Picture"
            type="media"
          />

          {/* <ImageCarouselComponent
            imageList={imageList}
            SIZE={SIZE}
            SPACER={SPACER}
            handleSelectImage={handleSelectImage}
            selectedImage={selectedImage}
            x={x}
          /> */}

          <Animated.FlatList
            ref={flatListRef}
            data={imageList}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            bounces={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: SPACING.spacing20 }}
            decelerationRate={0}
            onScroll={onScroll}
            snapToInterval={SIZE}
            snapToAlignment={"start"}
            // getItemLayout={getItemLayout}
            scrollEventThrottle={16}
            renderItem={({ item, index }) => {
              return (
                <CarouselItemComponent
                  x={x}
                  SIZE={SIZE}
                  SPACER={SPACER}
                  index={index}
                  item={item}
                  SCREEN_WIDTH={SCREEN_WIDTH}
                  handleSelectImage={handleSelectImage}
                  selectedImage={selectedImage}
                />
              );
            }}
            ListHeaderComponent={<View style={{ width: SPACER }} />}
            ListFooterComponent={<View style={{ width: SPACER }} />}
          />

          <View style={styles.cameraAndVideoContainer}>
            <GalleryImageSelector
              onImageSelected={handleSelectImage}
              imageList={imageList}
              setImageList={setImageList}
            />

            <Animated.View
              style={[styles.videoIconContainer, iConContainerStyle]}
            >
              <CustomIcon
                library="Entypo"
                name="video"
                size={28}
                color={videoId === "" ? COLORS.folly : COLORS.white}
                onPress={handleOpen}
              />
            </Animated.View>
          </View>

          <DemoNextButton navigation={navigation} type="media" />

          <CustomBottomSheet
            snapPoint={snapPoint}
            setIsBottomSheetVisible={setIsBottomSheetVisible}
            isBottomSheetVisible={isBottomSheetVisible}
            closeIconPresent={false}
          >
            <VideoLinkInput />
          </CustomBottomSheet>
        </SafeAreaView>
      </TouchableOpacity>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.blueNCS,
    justifyContent: "center",
    paddingVertical: SPACING.spacing40,
    paddingHorizontal: SPACING.spacing40,
  },
  cameraAndVideoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: SPACING.spacing40,
    width: "100%",
    position: "absolute",
    bottom: 180,
  },
  spacer: {
    padding: 22,
  },
  videoIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 45,
    height: 45,
    backgroundColor: COLORS.white,
    borderRadius: BORDER.circle,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  continueTextButton: {
    textAlign: "center",
  },
  flex1: {
    flex: 1,
  },
});
