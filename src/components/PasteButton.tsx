import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { CustomIcon } from "./CustomIcon";
import { COLORS, ICON_SIZE } from "../../assets/theme";
import * as Clipboard from "expo-clipboard";

type Props = TouchableOpacityProps & {
  customStyles?: object;
  setCopiedText: React.Dispatch<React.SetStateAction<string>>;
  setIsTouched: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PasteButton: React.FC<Props> = ({
  customStyles,
  setIsTouched,
  setCopiedText,
  ...rest
}) => {
  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync();
    setCopiedText(text);
    setIsTouched(true);
  };

  return (
    <TouchableOpacity onPress={fetchCopiedText} style={customStyles} {...rest}>
      <CustomIcon
        library="FontAwesome"
        name="paste"
        size={ICON_SIZE.default}
        color={COLORS.blackSecondaryText}
        onPress={fetchCopiedText}
      />
    </TouchableOpacity>
  );
};
