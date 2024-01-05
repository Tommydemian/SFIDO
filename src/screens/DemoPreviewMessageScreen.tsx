import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  AppState,
} from "react-native";
import React, { useEffect, useState } from "react";
import { OnBoardingContainer } from "../components/OnBoarding/OnBoardingContainer";
import { AbsoluteFillBgImage } from "../components/AbsoluteFillBgImage";
import { YungJakesText } from "../components/Fonts/YungJakesText";
import { TouchableOpacity } from "react-native";
import { useAuthContext } from "../contexts/AuthContext";
import { S3Image } from "../components/S3Image";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { COLORS } from "../../assets/theme";
import { YoutubeVideo } from "../components/YoutubeVideo";
import { CustomBottomSheet } from "../components/CustomBottomSheet";
import { DemoStackParams } from "../navigation/DemoStackNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useDemoMessageContext } from "../contexts/DemoMessageContext";
import { useBottomSheet } from "../hooks/useBottomSheet";
import { NunitoText } from "../components/Fonts/NunitoText";
import { CustomIcon } from "../components/CustomIcon";

import { CustomVideoBottomSheet } from "../components/CustomVideoBottomSheet";

import { useAppState } from "../hooks/useAppState";

type NavigationProps = NativeStackScreenProps<
  DemoStackParams,
  "DemoPreviewMessageScreen"
>;

export const DemoPreviewMessageScreen: React.FC<NavigationProps> = ({
  route,
  navigation,
}) => {
  const { image, text, videoId } = route.params;
  const { textColor } = useDemoMessageContext();
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(true);

  const { appState } = useAppState();

  const getIconStyles = (isVisible: boolean, baseStyles) => {
    return isVisible
      ? [styles.invisibleButton]
      : [...baseStyles, styles.actionButton];
  };
  // const {
  //   bottomSheetRef,
  //   isBottomSheetVisible,
  //   handleBottomSheetClose,
  //   handleBottomSheetOpen,
  //   setIsBottomSheetVisible,
  //   handleRefClose,
  // } = useBottomSheet();

  useEffect(() => {
    console.log(videoId, "VIDEOID");
  }, []);

  const { signOutUser } = useAuthContext();

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
        <S3Image imgKey="doberman.jpeg" style={styles.backgroundImage} />
        <Image source={{ uri: image }} style={styles.backgroundImage} />
        <AbsoluteFillBgImage imageKey="demobg" />
        <OnBoardingContainer>
          <View style={styles.quoteBodyContainer}>
            <YungJakesText
              customStyles={[styles.quoteBody, { color: textColor }]}
            >
              {text}
            </YungJakesText>
          </View>
          <TouchableOpacity onPress={signOutUser}>
            <Text>Sign out</Text>
          </TouchableOpacity>

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
          {/* <CustomIcon
            library="AntDesign"
            name="totop"
            size={30}
            color={COLORS.semiTransparent}
            customStyles={[styles.showBottomSheetButton, styles.actionButton]}
          /> */}
          <CustomVideoBottomSheet
            setIsBottomSheetVisible={setIsBottomSheetVisible}
            renderIcon={(handleOpenPress) => (
              <CustomIcon
                library="AntDesign"
                name="totop"
                size={30}
                color={COLORS.semiTransparent}
                customStyles={getIconStyles(isBottomSheetVisible, [
                  styles.showBottomSheetButton,
                ])}
                onPress={handleOpenPress}
              />
            )}
          >
            <View style={styles.videoContainer}>
              <YoutubeVideo videoId={videoId!} />
            </View>
          </CustomVideoBottomSheet>
        </OnBoardingContainer>
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
    flex: 1,
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
