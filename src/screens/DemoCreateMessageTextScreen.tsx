import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Keyboard,
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

import { FontPicker } from "../components/Demo/FontPicker";

import { useBottomSheet } from "../hooks/useBottomSheet";

import { COLORS, SPACING } from "../../assets/theme";

import { useDemoMessageContext } from "../contexts/DemoMessageContext";
import { DemoStackParams } from "../navigation/DemoStackNavigator";

type NavigationProps = NativeStackScreenProps<
  DemoStackParams,
  "DemoCreateMessageTextScreen"
>;

export const DemoCreateMessageTextScreen: React.FC<NavigationProps> = ({
  navigation,
}) => {
  const { videoId, text, modalSelectedImage } = useDemoMessageContext();
  const [isFontPickerOpen, setIsFontPickerOpen] = useState(false);

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
          <DemoIntroductionModal />
          {/* <AbsoluteFillBgImage imageKey="demoprepbg" /> */}
          <OnBoardingContainer>
            <DemoTextInput
              placeholder="Write what you need to listen..."
              setIsFontPickerOpen={setIsFontPickerOpen}
              onPress={() =>
                handleBottomSheetOpen({ activeOne: "colorPicker" })
              }
              render={({ handleWriteMyOwn }) => {
                return (
                  <View style={styles.actionsContainer}>
                    <SubmitButton
                      customStyles={styles.writeOwnMssgButton}
                      onPress={handleWriteMyOwn}
                    >
                      <NunitoText
                        customStyles={styles.writeOwnMssgButtonText}
                        type="bold"
                      >
                        Write My Message
                      </NunitoText>
                    </SubmitButton>
                    {isFontPickerOpen && <FontPicker />}
                  </View>
                );
              }}
            />

            <DemoNeedInspiration />

            <DemoTextPreview />

            <View
              style={{
                width: "50%",
                alignSelf: "center",
                backgroundColor: "red",
              }}
            >
              <SubmitButton
                customStyles={styles.ctaButton}
                onPress={() => navigation.navigate("DemoCreateMessageScreen")}
              >
                <NunitoText customStyles={styles.textButton} type="bold">
                  Continue
                </NunitoText>
              </SubmitButton>
            </View>
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
    backgroundColor: COLORS.indigoDye,
  },
  ctaButton: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
  writeOwnMssgButton: {
    backgroundColor: COLORS.celadon,
    width: "60%",
  },
  writeOwnMssgButtonText: {
    // color: "#363636",
    color: COLORS.blackSecondaryText,
    textAlign: "center",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
