import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { COLORS } from "../../../assets/theme";

type Props = {
  setFontSelected: React.Dispatch<React.SetStateAction<string>>;
  handleFontPickerOpen: () => void;
  fontFamily: string;
};

export const FontPickerSelectItem: React.FC<Props> = ({
  fontFamily,
  handleFontPickerOpen,
  setFontSelected,
}) => {
  const handleFontSelection = () => {
    setFontSelected(fontFamily);
    handleFontPickerOpen();
  };

  useEffect(() => {
    console.log(fontFamily, "from select item");
  }, [fontFamily]);

  return (
    <TouchableOpacity onPress={handleFontSelection}>
      <Text style={[styles.text, { fontFamily: fontFamily }]}>Pick a Font</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: COLORS.blackSecondaryText,
    fontSize: 25,
  },
  yungText: {
    backgroundColor: "red",
    fontSize: 30,
  },
});
