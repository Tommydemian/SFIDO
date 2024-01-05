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
import { SubmitButton } from "../components/SubmitButton";
import { NunitoText } from "../components/Fonts/NunitoText";
import { OnBoardingContainer } from "../components/OnBoarding/OnBoardingContainer";
import { CustomColorPickerBottomSheet } from "../components/CustomColorPickerBottomSheet";
import { DemoTextInput } from "../components/Demo/DemoTextInput";
import { DemoImageModal } from "../components/Demo/DemoImageModal";
import { VideoLinkInput } from "../components/VideoLinkInput";
import { DemoNeedInspiration } from "../components/Demo/DemoNeedInspiration";
import { DemoMessageCreationActions } from "../components/Demo/DemoMessageCreationActions";
import { AbsoluteFillBgImage } from "../components/AbsoluteFillBgImage";

import { useBottomSheet } from "../hooks/useBottomSheet";

import { COLORS, SPACING } from "../../assets/theme";

import { useDemoMessageContext } from "../contexts/DemoMessageContext";
import { DemoStackParams } from "../navigation/DemoStackNavigator";

type NavigationProps = NativeStackScreenProps<
  DemoStackParams,
  "DemoCreateMessageScreen"
>;

export const DemoCreateMessageScreen: React.FC<NavigationProps> = ({
  navigation,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {
    videoId,
    text,
    modalSelectedImage,
    setModalSelectedImage,
    selectedImage,
    setSelectedImage,
  } = useDemoMessageContext();

  const handleModalSelectedImage = (selectedImage: string) => {
    setModalSelectedImage(selectedImage);
    setIsModalVisible(false);
  };

  // Llamado cuando se selecciona una imagen
  const handleImageSelected = (uri: string) => {
    setSelectedImage(uri);
    setIsModalVisible(true); // Abre el modal
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
          <DemoIntroductionModal />

          <AbsoluteFillBgImage imageKey="demoprepbg" />

          <OnBoardingContainer>
            <DemoTextInput
              placeholder="Write what you need to listen..."
              onPress={() =>
                handleBottomSheetOpen({ activeOne: "colorPicker" })
              }
              render={({ handleWriteMyOwn }) => {
                return (
                  <DemoMessageCreationActions
                    handleWriteMyOwn={handleWriteMyOwn}
                    handleImageSelected={handleImageSelected}
                  />
                );
              }}
            />

            {/* Need inspiration */}
            <DemoNeedInspiration />

            {/* Video section */}
            <VideoLinkInput />

            {/* Image modal */}
            <DemoImageModal
              selectedImage={selectedImage}
              isModalVisible={isModalVisible}
              setIsModalVisible={setIsModalVisible}
              handleModalSelectedImage={handleModalSelectedImage}
            />

            {/* <TouchableOpacity onPress={signOutUser}><Text>Sign out</Text></TouchableOpacity> */}

            {modalSelectedImage && (
              <View style={styles.modalSelectedImageContainer}>
                <Image
                  source={{ uri: modalSelectedImage }}
                  style={styles.modalselectedImage}
                />
              </View>
            )}

            <View style={{ width: "50%", alignSelf: "center" }}>
              <SubmitButton
                onPress={() =>
                  navigation.navigate("DemoPreviewMessageScreen", {
                    image: modalSelectedImage,
                    text: text,
                    videoId: videoId,
                  })
                }
              >
                <NunitoText
                  type="bold"
                  customStyles={styles.continueTextButton}
                >
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
  continueButton: {
    backgroundColor: "#007bff",
    borderRadius: 10,
    padding: 10,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
  modalSelectedImageContainer: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalselectedImage: {
    height: 300,
    width: 300,
    alignSelf: "center",
    borderRadius: SPACING.spacing10,
  },
  continueTextButton: {
    textAlign: "center",
  },
});
