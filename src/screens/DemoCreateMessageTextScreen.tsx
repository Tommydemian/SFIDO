import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { DemoIntroductionModal } from "../components/Demo/DemoIntroductionModal";
import { NunitoText } from "../components/Fonts/NunitoText";
import { OnBoardingContainer } from "../components/OnBoarding/OnBoardingContainer";
import { DemoTextInput } from "../components/Demo/DemoTextInput";
import { SubmitButton } from "../components/SubmitButton";
import { DemoTextActions } from "../components/Demo/DemoTextActions";

import { DemoScreenTitle } from "../components/Demo/DemoScreenTitle";

import {
  COLORS,
  FONT_SIZE,
  ICON_SIZE,
  SPACING,
  WIDHT,
} from "../../assets/theme";

import { DemoStackParams } from "../navigation/DemoStackNavigator";
import { AbsoluteFillBgImage } from "../components/AbsoluteFillBgImage";
import { HandWithPenSvg } from "../components/HandWithPenSvg";
import { CustomIcon } from "../components/CustomIcon";

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
          <OnBoardingContainer>
            <View style={styles.headerContainer}>
              <CustomIcon
                library="Ionicons"
                name="chevron-back"
                size={ICON_SIZE.goBack}
                color={COLORS.white}
                onPress={() => navigation.goBack()}
                customStyles={styles.goBack}
              />
              <DemoScreenTitle title="Craft a message">
                <HandWithPenSvg />
              </DemoScreenTitle>
            </View>

            <DemoTextInput
              placeholder="Write what you need to listen..."
              handleFontPickerOpen={handleFontPickerOpen}
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
              customStyles={styles.nextButton}
              onPress={() =>
                navigation.navigate("DemoCreateMessageMediaScreen")
              }
            >
              <NunitoText customStyles={styles.textButton} type="bold">
                Next
              </NunitoText>
            </SubmitButton>
          </OnBoardingContainer>
        </SafeAreaView>
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
  previewImage: {
    width: "100%",
    height: "80%", // Ajusta según sea necesario
    resizeMode: "contain",
  },
  textButton: {
    textAlign: "center",
    color: "#fff",
  },
  textAlign: {
    textAlign: "center",
  },
  goBack: {
    position: "absolute",
    left: 0,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
