import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { MainContainer } from "../components/MainContainer";
import { AbsoluteFillBgImage } from "../components/AbsoluteFillBgImage";
import { S3Image } from "../components/S3Image";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { COLORS } from "../../assets/theme";
import { YoutubeVideo } from "../components/YoutubeVideo";
import { CustomBottomSheet } from "../components/CustomBottomSheet";
import { DemoStackParams } from "../navigation/DemoStackNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useCraftMessageContext } from "../contexts/CraftMessageContext";
import { NunitoText } from "../components/Fonts/NunitoText";
import { CustomIcon } from "../components/CustomIcon";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

import { useAppState } from "../hooks/useAppState";
import { useBottomSheet } from "../hooks/useBottomSheet";

type NavigationProps = NativeStackScreenProps<
  DemoStackParams,
  "DemoPreviewMessageScreen"
>;

const SCREEN_HEIGHT = Dimensions.get("window").height;

export const DemoPreviewMessageScreen: React.FC<NavigationProps> = ({
  navigation,
}) => {
  const { text, videoId, selectedImage } = useCraftMessageContext();
  const [playing, setPlaying] = useState(false);
  const [snapPoint] = useState("30%");
  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const { handleOpen, isBottomSheetVisible, setIsBottomSheetVisible } =
    useBottomSheet(videoId === "" ? false : true);

  const { appState } = useAppState();

  const getIconStyles = (isVisible: boolean, baseStyles) => {
    return isVisible
      ? [styles.invisibleButton]
      : [...baseStyles, styles.actionButton];
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    console.log(appState);
  }, [appState]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Back Button */}
        <CustomIcon
          library="Ionicons"
          onPress={handleGoBack}
          name="arrow-back-circle"
          size={30}
          color={COLORS.semiTransparent}
          customStyles={[styles.actionButton, styles.backButton]}
        />
        {/* <S3Image imgKey="doberman.jpeg" style={styles.backgroundImage} /> */}
        <Image source={{ uri: selectedImage }} style={styles.backgroundImage} />
        <AbsoluteFillBgImage imageKey="demobg" />
        <MainContainer>
          <View style={styles.quoteBodyContainer}>
            <Text
              style={[
                styles.quoteBody,
                { color: text.color, fontFamily: text.fontFamily },
              ]}
            >
              {text.content}
            </Text>
          </View>

          <CustomIcon
            library="MaterialIcons"
            name="navigate-next"
            size={30}
            color={COLORS.semiTransparent}
            customStyles={getIconStyles(isBottomSheetVisible, [
              styles.nextButton,
            ])}
            onPress={() => navigation.navigate("BottomTabs")}
          />
          {videoId !== "" && (
            <CustomIcon
              library="Entypo"
              name="video"
              size={28}
              color={videoId === "" ? COLORS.folly : COLORS.white}
              onPress={handleOpen}
            />
          )}

          <CustomBottomSheet
            setIsBottomSheetVisible={setIsBottomSheetVisible}
            isBottomSheetVisible={isBottomSheetVisible}
            closeIconPresent={true}
            ref={bottomSheetRef}
          >
            <View style={styles.videoContainer}>
              <YoutubeVideo
                videoId={videoId!}
                playing={playing}
                setPlaying={setPlaying}
              />
            </View>
          </CustomBottomSheet>
        </MainContainer>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  quoteBody: {
    fontSize: 40,
    justifyContent: "center",
    color: COLORS.blackSecondaryText,
  },
  quoteBodyContainer: {
    height: SCREEN_HEIGHT * 0.9,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
    width: "100%",
    height: "100%", // Ajustar según necesidad
  },
  videoContainer: {
    alignSelf: "center",
    width: 300,
  },
  actionButton: {
    position: "absolute",
    zIndex: 100,
  },
  backButton: {
    top: "10%",
    left: "5%",
  },
  nextButton: {
    bottom: "20%",
    right: "10%",
  },
  showBottomSheetButton: {
    bottom: "10%",
    alignSelf: "center",
  },
  invisibleButton: {
    opacity: 0,
  },
});
