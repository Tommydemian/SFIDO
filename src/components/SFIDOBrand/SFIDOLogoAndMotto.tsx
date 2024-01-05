import { StyleSheet, View } from "react-native";
import React from "react";
import { SFIDOLogo } from "./SFIDOLogo";
import { SFIDOTextLogo } from "./SFIDOTextLogo";
import { SFIDOMotto } from "./SFIDOMotto";
import { SPACING } from "../../../assets/theme";

export const SFIDOLogoAndMotto = () => {
  return (
    <View style={styles.container}>
      <SFIDOLogo />
      <SFIDOTextLogo />
      <SFIDOMotto />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: SPACING.spacing30,
  },
});
