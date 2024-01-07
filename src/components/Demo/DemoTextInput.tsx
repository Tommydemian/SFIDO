import React, { useEffect } from "react";
import { TextInput, StyleSheet, Dimensions, View, Text } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useDemoTextInput } from "../../hooks/useDemoTextInput";
import { CustomIcon } from "../CustomIcon";
import {
  BORDER,
  COLORS,
  FONT_SIZE,
  ICON_SIZE,
  SPACING,
} from "../../../assets/theme";
import { ActiveBottomSheet } from "../../types";
import { useDemoMessageContext } from "../../contexts/DemoMessageContext";

type Props = {
  placeholder: string;
  render: (props: RenderProps) => React.ReactNode;
  onPress: (type: ActiveBottomSheet) => void;
  handleFontPickerOpen: () => void;
};

type RenderProps = {
  handleWriteMyOwn: () => void;
};

const { width } = Dimensions.get("window");

export const DemoTextInput: React.FC<Props> = ({
  placeholder,
  render,
  onPress,
  handleFontPickerOpen,
}) => {
  const { scale, textInputRef, handleWriteMyOwn } = useDemoTextInput();

  const { text, setText, fontSelected } = useDemoMessageContext();

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  useEffect(() => {
    console.log(fontSelected, "fontSelected");
  }, [fontSelected]);

  return (
    <>
      <Animated.View style={animatedStyles}>
        <TextInput
          ref={textInputRef}
          style={[styles.textInput, { fontFamily: fontSelected }]}
          value={text}
          multiline={true}
          placeholder={placeholder}
          onChangeText={(newText) => setText(newText)}
          keyboardType="default"
        />
        {/* <View style={[styles.iconContainer, styles.paletteIconContainer]}>
          <CustomIcon
            library="Ionicons"
            name="color-palette"
            size={ICON_SIZE.default}
            color={textColor}
            onBottomSheetPress={onPress}
          />
        </View> */}
        {/* <View style={[styles.fontIconContainer, styles.iconContainer]}>
          <CustomIcon
            library="FontAwesome"
            name="font"
            size={ICON_SIZE.small}
            color={textColor}
            onPress={handleFontPickerOpen}
          />
        </View> */}
      </Animated.View>
      {render({ handleWriteMyOwn })}
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    // borderWidth: 1,
    // borderColor: "#CCCCCC",
    borderRadius: BORDER.border10,
    width: width - 40,
    padding: SPACING.spacing15,
    fontSize: 16,
    backgroundColor: COLORS.semiTransparent,
    textAlignVertical: "top",
    minHeight: 357,
    shadowColor: "#000", // Color de la sombra
    shadowOffset: { width: 0, height: 1 }, // Desplazamiento de la sombra
    shadowOpacity: 0.5, // Opacidad de la sombra
    shadowRadius: 1, // Radio de la sombra
    elevation: 5,
    alignSelf: "center",
    color: COLORS.whiteText,
  },
  // iconContainer: {
  //   position: "absolute",
  //   bottom: 0,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   backgroundColor: COLORS.whiteSmoke,
  //   height: 30,
  //   width: 30,
  //   borderRadius: 100,
  // },
  // paletteIconContainer: {
  //   right: 0,
  // },
  // fontIconContainer: {
  //   right: 50,
  // },
});
