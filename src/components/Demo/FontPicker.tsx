import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { COLORS, SPACING } from "../../../assets/theme";
import { NunitoText } from "../Fonts/NunitoText";
import { RobotoText } from "../Fonts/RobotoText";
import { YungJakesText } from "../Fonts/YungJakesText";
import { MerriweatherText } from "../Fonts/MerriweatherText";
import { useDemoMessageContext } from "../../contexts/DemoMessageContext";
import { BebasNeueText } from "../Fonts/BebasNeueText";

type Props = {
  handleFontPickerOpen: () => void;
};

export const FontPicker: React.FC<Props> = ({ handleFontPickerOpen }) => {
  const { setFontSelected, fontSelected } = useDemoMessageContext();

  useEffect(() => {
    console.log(fontSelected);
  }, [fontSelected]);

  const handleFontSelection = (fontFamily: string) => {
    setFontSelected(fontFamily);
    handleFontPickerOpen();
  };

  return (
    <View style={styles.fontPickerContainer}>
      <TouchableOpacity onPress={() => handleFontSelection("NunitoRegular")}>
        <NunitoText customStyles={styles.text}>Nunito</NunitoText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleFontSelection("RobotoRegular")}>
        <RobotoText customStyles={styles.text}>Roboto</RobotoText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleFontSelection("MerriweatherRegular")}
      >
        <MerriweatherText customStyles={styles.text}>
          MerriWeather
        </MerriweatherText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleFontSelection("BebasNeueRegular")}>
        <BebasNeueText customStyles={styles.text}>Bebas Neus</BebasNeueText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleFontSelection("YungJakesRegular")}>
        <YungJakesText customStyles={styles.text}>Yung Jakes</YungJakesText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  fontPickerContainer: {
    backgroundColor: COLORS.whiteSmoke,
    paddingVertical: SPACING.spacing10,
    paddingHorizontal: SPACING.spacing10,
    borderRadius: 10,
  },
  text: {
    color: COLORS.blackSecondaryText,
    fontSize: 25,
  },
  yungText: {
    backgroundColor: "red",
    fontSize: 30,
  },
});
