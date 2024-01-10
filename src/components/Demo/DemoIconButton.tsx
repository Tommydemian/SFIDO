import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import React from "react";

import { COLORS, SPACING } from "../../../assets/theme";
import Animated, {
  SharedValue,
  useDerivedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

type Props = ViewProps & {
  children: React.ReactNode;
  customStyles?: object;
  wasPressed: SharedValue<boolean>;
};

export const DemoIconButton: React.FC<Props> = ({
  children,
  customStyles,
  wasPressed,
  ...rest
}) => {
  const backgroundColor = useDerivedValue(() => {
    return wasPressed.value ? COLORS.folly : COLORS.white;
  });

  const iconContainerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(backgroundColor.value, {
        duration: 300,
      }),
    };
  });

  return (
    <Animated.View
      {...rest}
      style={[styles.iconButton, customStyles, iconContainerStyle]}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  iconButton: {
    borderRadius: 100,
    backgroundColor: COLORS.folly, // O el color que prefieras
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.spacing10,
    padding: SPACING.spacing10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
