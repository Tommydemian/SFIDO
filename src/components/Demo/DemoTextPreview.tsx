import React from "react";
import { TextInput, StyleSheet, Dimensions } from "react-native";
import { useDemoMessageContext } from "../../contexts/DemoMessageContext";
import { COLORS } from "../../../assets/theme";

const { width } = Dimensions.get("window");

export const DemoTextPreview: React.FC = () => {
  const { text, textColor, font } = useDemoMessageContext();

  return (
    <TextInput
      style={[
        styles.textPreview,
        {
          color: textColor,
          backgroundColor: COLORS.semiTransparent,
          fontFamily: font,
        },
      ]}
      value={text}
      multiline={true}
      editable={false} // read-only
    />
  );
};

const styles = StyleSheet.create({
  textPreview: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 10,
    width: width - 40,
    padding: 15,
    fontSize: 16,
    textAlignVertical: "top",
    minHeight: 150,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 5,
    alignSelf: "center",
    marginTop: 20,
  },
});
