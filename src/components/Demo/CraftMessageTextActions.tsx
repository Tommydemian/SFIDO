import { Pressable, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { CustomIcon } from "../CustomIcon";
import { useCraftMessageContext } from "../../contexts/CraftMessageContext";
import { CraftMessageNeedInspiration } from "./CraftMessageNeedInspiration";
import { ColorBox } from "../ColorBox";
import { useToggle } from "../../hooks/useToggle";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useIterateAndSelectFont } from "../../hooks/useIterateAndSelectFont";
import { PostMessageNavigationProps } from "../../screens/PostMessageTextScreen";
import {
  COLORS,
  ICON_SIZE,
  SPACING,
  BOX_COLORS,
  BORDER,
} from "../../../assets/theme";

type Props = {
  handleWriteMyOwn: () => void;
  navigation?: PostMessageNavigationProps["navigation"];
  section: "Demo" | "Post";
};

export const CraftMessageTextActions: React.FC<Props> = ({
  handleWriteMyOwn,
  section,
}) => {
  const { setText } = useCraftMessageContext();
  const [isColorPickerOpen, toggle] = useToggle();
  const { fontIndexIncrease } = useIterateAndSelectFont();
  const colorPickerHeight = useSharedValue(0);

  useEffect(() => {
    colorPickerHeight.value = withTiming(isColorPickerOpen ? 250 : 0, {
      duration: 300,
    });
  }, [isColorPickerOpen]);

  const animatedColorPickerStyle = useAnimatedStyle(() => {
    return {
      height: colorPickerHeight.value,
      overflow: "hidden",
    };
  });

  function handleColorSelect(color: string) {
    setText((prevState) => ({ ...prevState, color }));
    toggle();
  }

  return (
    <View style={styles.actionsContainer}>
      <View style={styles.iconsContainer}>
        {isColorPickerOpen && (
          <Animated.View style={[styles.colorPicker, animatedColorPickerStyle]}>
            {Object.values(BOX_COLORS).map((color) => (
              <ColorBox
                onPress={() => handleColorSelect(color)}
                key={color}
                color={color}
              />
            ))}
          </Animated.View>
        )}
        <Pressable onPress={toggle} style={styles.iconWrapper}>
          <CustomIcon
            library="Ionicons"
            name="color-palette"
            size={ICON_SIZE.default}
            color={COLORS.whiteText}
            onPress={toggle}
          />
        </Pressable>
        <Pressable style={styles.iconWrapper}>
          <CustomIcon
            library="FontAwesome"
            name="font"
            size={ICON_SIZE.small}
            color={COLORS.whiteText}
            onPress={fontIndexIncrease}
          />
        </Pressable>
      </View>
      <CraftMessageNeedInspiration section={section} />
    </View>
  );
};

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: SPACING.spacing20,
  },
  iconsContainer: {
    flexDirection: "row",
    columnGap: SPACING.spacing10,
  },
  writeOwnMssgButton: {
    backgroundColor: COLORS.ghostWhite,
  },
  writeOwnMssgButtonText: {
    // color: "#363636",
    color: COLORS.blackSecondaryText,
    textAlign: "center",
  },
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.folly,
    height: 34,
    width: 34,
    borderRadius: 100,
    position: "relative",
    zIndex: 4,
  },
  colorPicker: {
    width: 34,
    height: 200,
    backgroundColor: COLORS.semiTransparentDark,
    position: "absolute",
    top: 16,
    zIndex: 1,
    alignItems: "center",
    paddingTop: SPACING.spacing20,
    borderRadius: BORDER.circle,
  },
});
