import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Keyboard,
  StatusBar,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { DemoIntroductionModal } from "../components/Demo/DemoIntroductionModal";
import { NunitoText } from "../components/Fonts/NunitoText";
import { OnBoardingContainer } from "../components/OnBoarding/OnBoardingContainer";
import { CustomColorPickerBottomSheet } from "../components/CustomColorPickerBottomSheet";
import { DemoTextInput } from "../components/Demo/DemoTextInput";
import { SubmitButton } from "../components/SubmitButton";
import { DemoNeedInspiration } from "../components/Demo/DemoNeedInspiration";
import { DemoTextPreview } from "../components/Demo/DemoTextPreview";
import { useBottomSheet } from "../hooks/useBottomSheet";

import { DemoScreenTitle } from "../components/Demo/DemoScreenTitle";

import { COLORS, FONT_SIZE, SPACING } from "../../assets/theme";

import { DemoStackParams } from "../navigation/DemoStackNavigator";
import DemoTextActions from "../components/Demo/DemoTextActions";
import { AbsoluteFillBgImage } from "../components/AbsoluteFillBgImage";

type NavigationProps = NativeStackScreenProps<
  DemoStackParams,
  "DemoCreateMessageTextScreen"
>;

export const DemoCreateMessageTextScreen: React.FC<NavigationProps> = ({
  navigation,
}) => {
  const [isFontPickerOpen, setIsFontPickerOpen] = useState(false);

  const handleFontPickerOpen = () => {
    setIsFontPickerOpen((prev) => !prev);
  };

  const {
    handleBottomSheetClose,
    handleBottomSheetOpen,
    isBottomSheetVisible,
    bottomSheetRef,
    activeBottomSheet,
  } = useBottomSheet();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TouchableOpacity
        style={{ flex: 1 }}
        activeOpacity={1}
        onPress={() => Keyboard.dismiss()}
      >
        <SafeAreaView style={styles.container}>
          <AbsoluteFillBgImage imageKey="vector" />
          <DemoIntroductionModal />
          <OnBoardingContainer customStyles={styles.contentContainer}>
            <DemoScreenTitle>Craft a message</DemoScreenTitle>

            <DemoTextInput
              placeholder="Write what you need to listen..."
              handleFontPickerOpen={handleFontPickerOpen}
              onPress={() =>
                handleBottomSheetOpen({ activeOne: "colorPicker" })
              }
              render={({ handleWriteMyOwn }) => {
                return (
                  <DemoTextActions
                    handleFontPickerOpen={handleFontPickerOpen}
                    handleWriteMyOwn={handleWriteMyOwn}
                    isFontPickerOpen={isFontPickerOpen}
                  />
                );
              }}
            />

            <SubmitButton
              customStyles={styles.continueButton}
              onPress={() =>
                navigation.navigate("DemoCreateMessageMediaScreen")
              }
            >
              <NunitoText customStyles={styles.textButton} type="bold">
                Continue
              </NunitoText>
            </SubmitButton>
          </OnBoardingContainer>
        </SafeAreaView>

        {isBottomSheetVisible &&
          activeBottomSheet?.activeOne === "colorPicker" && (
            <CustomColorPickerBottomSheet
              ref={bottomSheetRef}
              handleBottomSheetClose={handleBottomSheetClose}
            />
          )}
      </TouchableOpacity>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: COLORS.blueNCS,
  },
  contentContainer: {
    // backgroundColor: COLORS.celadon,
  },
  continueButton: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignSelf: "center",
  },
  previewImage: {
    width: "100%",
    height: "80%", // Ajusta según sea necesario
    resizeMode: "contain",
  },
  textButton: {
    textAlign: "center",
  },
  textAlign: {
    textAlign: "center",
  },
});
