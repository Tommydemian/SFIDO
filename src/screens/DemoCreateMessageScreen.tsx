import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Keyboard,
} from "react-native";
import React, { useState, useEffect } from "react";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { CustomIcon } from "../components/CustomIcon";

import { GalleryImageSelector } from "../components/GalleryImageSelector";
import { DemoIntroductionModal } from "../components/Demo/DemoIntroductionModal";
import { SubmitButton } from "../components/SubmitButton";
import { NunitoText } from "../components/Fonts/NunitoText";
import { OnBoardingContainer } from "../components/OnBoarding/OnBoardingContainer";
import { CustomBottomSheet } from "../components/CustomBottomSheet";
import { DemoTextInput } from "../components/Demo/DemoTextInput";
import { DemoImageModal } from "../components/Demo/DemoImageModal";
import { VideoLinkInput } from "../components/VideoLinkInput";
import { DemoNeedInspiration } from "../components/Demo/DemoNeedInspiration";

import { AbsoluteFillBgImage } from "../components/AbsoluteFillBgImage";

import { useAuthContext } from "../contexts/AuthContext";
import { useBottomSheet } from "../hooks/useBottomSheet";

import { BORDER, COLORS, SPACING } from "../../assets/theme";

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

  // hooks
  const {
    handleBottomSheetClose,
    handleBottomSheetOpen,
    isBottomSheetVisible,
    bottomSheetRef,
  } = useBottomSheet();

  //const {signOutUser} = useAuthContext()

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
              render={({ handleWriteMyOwn }) => {
                return (
                  <View style={styles.actionsContainer}>
                    <View style={styles.submitButtonContainer}>
                      {/* Button to clean the Text input */}
                      <View style={{ flexDirection: "column" }}>
                        <SubmitButton
                          onPress={handleWriteMyOwn}
                          style={styles.button}
                        >
                          <NunitoText
                            customStyles={styles.buttonText}
                            type="bold"
                          >
                            Write My Message
                          </NunitoText>
                        </SubmitButton>
                        {/* Need inspiration */}
                        <DemoNeedInspiration onPress={handleBottomSheetOpen} />
                      </View>
                    </View>

                    {/* Image Selector */}
                    <GalleryImageSelector
                      onImageSelected={handleImageSelected}
                    />
                  </View>
                );
              }}
            />

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
                    videoId: "fnGcsc4Wrr0",
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

        {isBottomSheetVisible && (
          <CustomBottomSheet ref={bottomSheetRef}>
            <View style={styles.bottomSheetContentContainer}>
              <TouchableOpacity
                style={styles.bottomSheetCloseButton}
                onPress={handleBottomSheetClose}
              >
                <CustomIcon
                  library="AntDesign"
                  name="closecircleo"
                  size={24}
                  color={COLORS.blackSecondaryText}
                />
              </TouchableOpacity>
              <NunitoText customStyles={styles.bottomSheetContent}>
                If you're feeling a bit lost or just unsure what to write, visit
                our [Inspiration Section] to find famous quotes that might
                motivate you.
              </NunitoText>
            </View>
          </CustomBottomSheet>
        )}
      </TouchableOpacity>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: COLORS.whiteText,
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
  bottomSheetContent: {
    color: COLORS.blackSecondaryText,
    fontSize: 18,
  },
  bottomSheetContentContainer: {
    padding: SPACING.spacing20,
  },
  bottomSheetCloseButton: {
    alignSelf: "flex-end",
    margin: SPACING.spacing10,
  },
  submitButtonContainer: {
    width: "60%",
    marginBottom: 20,
  },
  buttonText: {
    textAlign: "center",
  },
  previewImage: {
    width: "100%",
    height: "80%", // Ajusta según sea necesario
    resizeMode: "contain",
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalSelectedImageContainer: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalselectedImage: {
    height: 200,
    width: 200,
    alignSelf: "center",
    borderRadius: SPACING.spacing10,
  },
  continueTextButton: {
    textAlign: "center",
  },
});
