import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import React from "react";

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
    width: 50,
    height: 50,
    borderRadius: 10,
    margin: 5,
    justifyContent: "center", // Center the content
    alignItems: "center", // Center the content
    elevation: 3, // Adds elevation for Android
    shadowColor: "#000", // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow position for iOS
    shadowOpacity: 0.25, // Shadow opacity for iOS
    shadowRadius: 3.84, // Shadow blur for iOS
  },
});
