import { useFonts } from "expo-font";

export const useLoadFonts = () => {
  const [fontsLoaded] = useFonts({
    NunitoRegular: require("../../../assets/fonts/Nunito-Regular.ttf"),
    NunitoSemiBold: require("../../../assets/fonts/Nunito-SemiBold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return fontsLoaded;
};
