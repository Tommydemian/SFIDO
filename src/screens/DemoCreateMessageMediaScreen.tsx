import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
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
} from "react-native-reanimated";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { SubmitButton } from "../components/SubmitButton";
import { NunitoText } from "../components/Fonts/NunitoText";
import { OnBoardingContainer } from "../components/OnBoarding/OnBoardingContainer";
import { DemoImageModal } from "../components/Demo/DemoImageModal";
import { VideoLinkInput } from "../components/VideoLinkInput";

import { BORDER, COLORS, ICON_SIZE, SPACING, WIDTH } from "../../assets/theme";

import { useDemoMessageContext } from "../contexts/DemoMessageContext";
import { DemoStackParams } from "../navigation/DemoStackNavigator";
import { GalleryImageSelector } from "../components/GalleryImageSelector";

import { initialImagesArr } from "../../assets/constants/data";
import { CarouselItem, ImageItem, SpacerItem } from "../types";
import { CarouselItemComponent } from "../components/Demo/CarouselItemComponent";
import { AbsoluteFillBgImage } from "../components/AbsoluteFillBgImage";
import { DemoScreenTitle } from "../components/Demo/DemoScreenTitle";
import { CollageSvg } from "../components/CollageSvg";
import { CustomIcon } from "../components/CustomIcon";

type NavigationProps = NativeStackScreenProps<
  DemoStackParams,
  "DemoCreateMessageMediaScreen"
>;

const isSpacerItem = (item: CarouselItem): item is SpacerItem => {
  return (item as SpacerItem).key !== undefined;
};

export const DemoCreateMessageMediaScreen: React.FC<NavigationProps> = ({
  navigation,
}) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const SIZE = SCREEN_WIDTH * 0.7;
  const SPACER = SPACING.spacing15;

  const x = useSharedValue(0);

  const [data, setData] = useState<CarouselItem[]>([
    { key: "space-left" },
    ...initialImagesArr,
    { key: "space-right" },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  const {
    videoId,
    text,
    modalSelectedImage,
    setModalSelectedImage,
    selectedImage,
    setSelectedImage,
  } = useDemoMessageContext();

  const isFromGallery = typeof modalSelectedImage === "string";

  const handleModalSelectedImage = (selectedImage: string) => {
    setModalSelectedImage(selectedImage);
    setIsModalVisible(false);
  };

  // Llamado cuando se selecciona una imagen
  const handleImageSelect = (uri: string) => {
    setSelectedImage(uri);
    setIsModalVisible(true); // Abre el modal
  };

  useEffect(() => {}, [selectedImage]);

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
          <View style={styles.headerContainer}>
            <CustomIcon
              library="Ionicons"
              name="chevron-back"
              size={ICON_SIZE.goBack}
              color={COLORS.white}
              onPress={() => navigation.goBack()}
              customStyles={styles.goBack}
            />
            <DemoScreenTitle title="Include a Picture">
              <CollageSvg />
            </DemoScreenTitle>
          </View>

          <Animated.FlatList
            data={data}
            keyExtractor={(item) =>
              "id" in item ? item.id.toString() : item.key
            }
            horizontal={true}
            bounces={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: 20 }}
            decelerationRate={0}
            onScroll={onScroll}
            snapToInterval={SIZE}
            snapToAlignment={"start"}
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
                  handleImageSelect={handleImageSelect}
                />
              );
            }}
          />
          {/* {modalSelectedImage && (
        <View style={styles.modalSelectedImageContainer}>
        <Image
        source={
          isFromGallery
          ? { uri: modalSelectedImage }
          : modalSelectedImage
        }
        style={styles.modalselectedImage}
        />
        </View>
      )} */}
          <View style={styles.cameraAndVideoContainer}>
            <GalleryImageSelector onImageSelected={handleImageSelect} />
            {/* <VideoLinkInput /> */}
            <Pressable style={styles.videoIconContainer}>
              <CustomIcon
                library="Entypo"
                name="video"
                size={28}
                color={COLORS.whiteText}
              />
            </Pressable>

            {/* <DemoImageModal
              selectedImage={selectedImage}
              isModalVisible={isModalVisible}
              setIsModalVisible={setIsModalVisible}
              handleModalSelectedImage={handleModalSelectedImage}
            /> */}
          </View>
          <SubmitButton
            customStyles={styles.nextButton}
            onPress={() =>
              navigation.navigate("DemoPreviewMessageScreen", {
                image: modalSelectedImage,
                text: text,
                videoId: videoId,
              })
            }
          >
            <NunitoText type="bold" customStyles={styles.textButton}>
              Next
            </NunitoText>
          </SubmitButton>
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
  nextButton: {
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5, // Para Android
    position: "absolute",
    bottom: SPACING.nextButtonBottom,
    width: 111,
    alignSelf: "center",
  },
  textButton: {
    textAlign: "center",
    color: "#fff",
  },
  continueButtonText: {
    color: "white",
    fontSize: 18,
  },
  previewImage: {
    width: "100%",
    height: "80%", // Ajusta según sea necesario
    resizeMode: "contain",
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
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  goBack: {
    position: "absolute",
    left: SPACING.spacing40,
  },
  spacer: {
    padding: 22,
  },
  videoIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 45,
    height: 45,
    backgroundColor: COLORS.folly,
    borderRadius: BORDER.circle,
    shadowColor: "rgba(27, 30, 54, 0.25)",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },

  //   modalSelectedImageContainer: {
  //     shadowColor: "#000",
  //     shadowOffset: { width: 0, height: 2 },
  //     shadowOpacity: 0.25,
  //     shadowRadius: 3.84,
  //     width: "100%",
  //     justifyContent: "center",
  //     alignItems: "center",
  //   },
  continueTextButton: {
    textAlign: "center",
  },
  flex1: {
    flex: 1,
  },
});
