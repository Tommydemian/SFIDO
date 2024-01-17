import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { DemoIntroductionModal } from "../components/Demo/DemoIntroductionModal";
import { MainContainer } from "../components/MainContainer";
import { CraftMessageTextInput } from "../components/Demo/CraftMessageTextInput";
import { CraftMessageTextActions } from "../components/Demo/CraftMessageTextActions";
import { DemoNextButton } from "../components/Demo/DemoNextButton";

import { CraftMessageHeader } from "../components/Demo/CraftMessageHeader";

import { COLORS } from "../../assets/theme";

import { DemoStackParams } from "../navigation/DemoStackNavigator";
import { AbsoluteFillBgImage } from "../components/AbsoluteFillBgImage";

export type DemoTextNavigationProps = NativeStackScreenProps<
  DemoStackParams,
  "DemoCreateMessageTextScreen"
>;

export const DemoCreateMessageTextScreen: React.FC<DemoTextNavigationProps> = ({
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
          <MainContainer>
            <CraftMessageHeader
              navigation={navigation}
              title="Craft a Message"
              type="text"
            />

            <CraftMessageTextInput
              placeholder="Write what you need to listen..."
              handleFontPickerOpen={handleFontPickerOpen}
              render={({ handleWriteMyOwn }) => {
                return (
                  <CraftMessageTextActions
                    handleWriteMyOwn={handleWriteMyOwn}
                    section="Demo"
                  />
                );
              }}
            />

            <DemoNextButton navigation={navigation} type="text" />
          </MainContainer>
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
  textAlign: {
    textAlign: "center",
  },
});
