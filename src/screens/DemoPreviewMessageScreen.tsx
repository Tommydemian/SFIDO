import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect } from "react";
import { OnBoardingContainer } from "../components/OnBoarding/OnBoardingContainer";
import { AbsoluteFillBgImage } from "../components/AbsoluteFillBgImage";
import { YungJakesText } from "../components/YungJakesText";
import { TouchableOpacity } from "react-native";
import { useAuthContext } from "../contexts/AuthContext";
import { S3Image } from "../components/S3Image";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { COLORS } from "../../assets/theme";
import { Ionicons } from "@expo/vector-icons";
import { YoutubeVideo } from "../components/YoutubeVideo";
import { DemoStackParams } from "../navigation/DemoStackNavigator";
//import { CustomBottomSheet } from "../components/CustomNeedInspirationBottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useDemoMessageContext } from "../contexts/DemoMessageContext";

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

  useEffect(() => {
    console.log(videoId, "VIDEOID");
  }, []);

  const { signOutUser } = useAuthContext();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Ionicons
        onPress={handleGoBack}
        style={{ position: "absolute", top: "50%" }}
        name="arrow-back-circle"
        size={30}
        color={COLORS.black}
      />
      <View style={styles.container}>
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

          {/* <CustomBottomSheet>
            <View style={styles.videoContainer}>
              <YoutubeVideo videoId={videoId!} />
            </View>
          </CustomBottomSheet> */}
        </OnBoardingContainer>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
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
});
