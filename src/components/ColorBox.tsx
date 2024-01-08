import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import React from "react";
import { BORDER } from "../../assets/theme";

type Props = TouchableOpacityProps & {
  color: string;
  onPress: (color: string) => void;
};

export const ColorBox: React.FC<Props> = ({ color, onPress, ...rest }) => {
  return (
    <TouchableOpacity onPress={() => onPress(color)} {...rest}>
      <View style={[styles.colorBox, { backgroundColor: color }]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  colorBox: {
    width: 22,
    height: 22,
    borderRadius: BORDER.circle,
    margin: 3,
    shadowColor: "rgba(27, 30, 54, 0.25)",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
