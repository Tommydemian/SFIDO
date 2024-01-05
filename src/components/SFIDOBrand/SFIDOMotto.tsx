import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NunitoText } from "../Fonts/NunitoText";
import { COLORS, LINE_HEIGHT, SPACING } from "../../../assets/theme";

export const SFIDOMotto = () => {
  return (
    <View style={styles.container}>
      <NunitoText customStyles={styles.subHeader}>
        Your goals, your dreams, your journey means a lot.
      </NunitoText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 198,
    alignSelf: "center",
  },
  subHeader: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: LINE_HEIGHT.default,
  },
});
