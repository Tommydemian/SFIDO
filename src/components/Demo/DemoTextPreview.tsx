import React from "react";
import { TextInput, StyleSheet, Dimensions } from "react-native";
import { useCraftMessageContext } from "../../contexts/CraftMessageContext";
import { BORDER, COLORS, FONT_SIZE, SPACING } from "../../../assets/theme";

const { width } = Dimensions.get("window");

export const DemoTextPreview: React.FC = () => {
  const { text } = useCraftMessageContext();

  return (
    <TextInput
      style={[
        styles.textPreview,
        {
          color: text.color,
          backgroundColor: COLORS.semiTransparent,
          fontFamily: text.fontFamily,
        },
      ]}
      value={text.content}
      multiline={true}
      editable={false} // read-only
    />
  );
};

const styles = StyleSheet.create({
  textPreview: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: BORDER.border10,
    width: width - 40,
    padding: SPACING.spacing15,
    fontSize: FONT_SIZE.textPreview,
    textAlignVertical: "top",
    minHeight: 200,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 5,
    alignSelf: "center",
    marginTop: 20,
  },
});
