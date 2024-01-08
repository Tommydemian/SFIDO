import { useState, useEffect } from "react";
import * as Font from "expo-font";

export const useFontsLoader = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        NunitoRegular: require("../../assets/fonts/Nunito-Regular.ttf"),
        RobotoRegular: require("../../assets/fonts/Roboto-Regular.ttf"),
        MerriweatherRegular: require("../../assets/fonts/Merriweather-Regular.ttf"),
        BebasNeueRegular: require("../../assets/fonts/BebasNeue-Regular.ttf"),
        YungJakesTextRegular: require("../../assets/fonts/YungJakesNewHandwriting-Regular.ttf"),
      });

      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  return fontsLoaded;
};
