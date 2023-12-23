import React from "react";
import { Entypo, AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { ActiveBottomSheet } from "../types";

type Props = {
  name: string;
  size: number;
  color: string;
  library: "Entypo" | "AntDesign" | "FontAwesome" | "Ionicons";
  customStyles?: object;
  onPress?: () => void;
  onBottomSheetPress?: (type: ActiveBottomSheet) => void;
};

export const CustomIcon: React.FC<Props> = ({
  name,
  onPress,
  size,
  color,
  library,
  customStyles,
  onBottomSheetPress,
}) => {
  const handlePress = () => {
    if (onBottomSheetPress) {
      onBottomSheetPress({ activeOne: "colorPicker" });
    } else if (onPress) {
      onPress();
    }
  };

  switch (library) {
    case "Entypo":
      return (
        <Entypo
          onPress={handlePress}
          style={customStyles}
          name={name}
          size={size}
          color={color}
        />
      );
    case "AntDesign":
      return (
        <AntDesign
          onPress={handlePress}
          style={customStyles}
          name={name}
          size={size}
          color={color}
        />
      );
    case "FontAwesome":
      return (
        <FontAwesome
          onPress={handlePress}
          style={customStyles}
          name={name}
          size={size}
          color={color}
        />
      );
    case "Ionicons":
      return (
        <Ionicons
          onPress={handlePress}
          style={customStyles}
          name={name}
          size={size}
          color={color}
        />
      );
    default:
      return null;
  }
};
