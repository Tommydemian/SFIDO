import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { COLORS, SPACING } from "../../../assets/theme";
import { NunitoText } from "../Fonts/NunitoText";
import { RobotoText } from "../Fonts/RobotoText";
import { YungJakesText } from "../Fonts/YungJakesText";
import { useDemoMessageContext } from "../../contexts/DemoMessageContext";

export const FontPicker = () => {
  const { setFont, font } = useDemoMessageContext();

  useEffect(() => {
    console.log(font);
  }, [font]);

  return (
    <View style={styles.fontPickerContainer}>
      <TouchableOpacity onPress={() => setFont("NunitoRegular")}>
        <NunitoText customStyles={styles.text}>Pick a Font</NunitoText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setFont("RobotoRegular")}>
        <RobotoText customStyles={styles.text}>Pick a Font</RobotoText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setFont("YungJakesTextRegular")}>
        <YungJakesText customStyles={[styles.yungText]}>
          Pick a Font
        </YungJakesText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  fontPickerContainer: {
    position: "absolute",
    right: 0,
    backgroundColor: COLORS.whiteSmoke,
    paddingVertical: SPACING.spacing20,
    paddingHorizontal: SPACING.spacing10,
    borderRadius: 10,
  },
  text: {
    color: COLORS.blackSecondaryText,
    fontSize: 20,
  },
  yungText: {
    backgroundColor: "red",
    fontSize: 30,
  },
});
