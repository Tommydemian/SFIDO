import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { CustomIcon } from "./CustomIcon";
import { COLORS } from "../../assets/theme";
import * as Clipboard from "expo-clipboard";

type Props = TouchableOpacityProps & {
  customStyles?: object;
  setCopiedText: React.Dispatch<React.SetStateAction<string>>;
};

export const PasteButton: React.FC<Props> = ({
  customStyles,
  setCopiedText,
  ...rest
}) => {
  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync();
    setCopiedText(text);
  };

  return (
    <TouchableOpacity onPress={fetchCopiedText} style={customStyles} {...rest}>
      <CustomIcon
        library="FontAwesome"
        name="paste"
        size={24}
        color={COLORS.blackSecondaryText}
      />
    </TouchableOpacity>
  );
};
