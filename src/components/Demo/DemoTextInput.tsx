import React from "react";
import { TextInput, StyleSheet, Dimensions, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useDemoTextInput } from "../../hooks/useDemoTextInput";
import { CustomIcon } from "../CustomIcon";
import { COLORS, ICON_SIZE, SPACING } from "../../../assets/theme";
import { ActiveBottomSheet } from "../../types";
import { useDemoMessageContext } from "../../contexts/DemoMessageContext";

type Props = {
  placeholder: string;
  render: (props: RenderProps) => React.ReactNode;
  onPress: (type: ActiveBottomSheet) => void;
  setIsFontPickerOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type RenderProps = {
  handleWriteMyOwn: () => void;
};

const { width } = Dimensions.get("window");

export const DemoTextInput: React.FC<Props> = ({
  placeholder,
  render,
  onPress,
  setIsFontPickerOpen,
}) => {
  const { scale, textInputRef, handleWriteMyOwn } = useDemoTextInput();

  const { text, setText, textColor } = useDemoMessageContext();

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handleFontPickerOpen = () => {
    setIsFontPickerOpen((prev) => !prev);
  };

  return (
    <>
      <Animated.View style={animatedStyles}>
        <TextInput
          ref={textInputRef}
          style={[styles.textInput]}
          value={text}
          multiline={true}
          placeholder={placeholder}
          onChangeText={(newText) => setText(newText)}
          keyboardType="default"
        />
        <View style={styles.paletteIconContainer}>
          <CustomIcon
            library="Ionicons"
            name="color-palette"
            size={ICON_SIZE.default}
            color={textColor}
            // customStyles={styles.paletteIcon}
            onBottomSheetPress={onPress}
          />
        </View>
        <View style={styles.fontIconContainer}>
          <CustomIcon
            library="FontAwesome"
            name="font"
            size={ICON_SIZE.small}
            color={textColor}
            onPress={handleFontPickerOpen}
            // customStyles={styles.paletteIcon}
            // onBottomSheetPress={onPress}
            // onPress={}
          />
        </View>
      </Animated.View>
      {render({ handleWriteMyOwn })}
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 10,
    width: width - 40,
    padding: 15,
    fontSize: 16,
    backgroundColor: COLORS.semiTransparent,
    textAlignVertical: "top",
    minHeight: 150,
    shadowColor: "#000", // Color de la sombra
    shadowOffset: { width: 0, height: 1 }, // Desplazamiento de la sombra
    shadowOpacity: 0.5, // Opacidad de la sombra
    shadowRadius: 1, // Radio de la sombra
    elevation: 5,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: SPACING.spacing10,
    color: COLORS.blackSecondaryText,
    // color: "#14080E",
  },
  paletteIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.whiteSmoke,
    height: 30,
    width: 30,
    borderRadius: 100,
  },
  fontIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.whiteSmoke,
    height: 30,
    width: 30,
    borderRadius: 100,
  },
  // paletteIcon: {
  //   position: "absolute",
  //   bottom: 0,
  //   right: 0,
  // },
});
