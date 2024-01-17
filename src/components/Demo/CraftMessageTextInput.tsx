import React from "react";
import { TextInput, StyleSheet, Dimensions, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useCraftMessageTextInput } from "../../hooks/useDemoTextInput";
import { BORDER, COLORS, SPACING } from "../../../assets/theme";
import { ActiveBottomSheet } from "../../types";
import { useCraftMessageContext } from "../../contexts/CraftMessageContext";
import { useFontsLoader } from "../../hooks/useLoadFonts";
import Spinner from "react-native-loading-spinner-overlay";

type Props = {
  placeholder: string;
  render: (props: RenderProps) => React.ReactNode;
  onPress?: (type: ActiveBottomSheet) => void;
  handleFontPickerOpen: () => void;
};

type RenderProps = {
  handleWriteMyOwn: () => void;
};

const { width } = Dimensions.get("window");

export const CraftMessageTextInput: React.FC<Props> = ({
  placeholder,
  render,
}) => {
  const { scale, textInputRef, handleWriteMyOwn } = useCraftMessageTextInput();
  const { text, setText } = useCraftMessageContext();
  const fontsLoaded = useFontsLoader();

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handleTextChange = (text: string) => {
    setText((prevState) => ({
      ...prevState,
      content: text,
    }));
  };

  if (!fontsLoaded) {
    return (
      <View>
        <Spinner visible={!fontsLoaded} />
      </View>
    );
  }

  return (
    <>
      <Animated.View style={animatedStyles}>
        <TextInput
          ref={textInputRef}
          style={[
            styles.textInput,
            { fontFamily: text.fontFamily, color: text.color },
          ]}
          value={text.content}
          multiline={true}
          placeholder={placeholder}
          onChangeText={handleTextChange}
          keyboardType="default"
        />
      </Animated.View>
      {render({ handleWriteMyOwn })}
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    marginTop: SPACING.spacing50,
    borderRadius: BORDER.border10,
    width: width - 40,
    paddingHorizontal: SPACING.spacing15,
    paddingTop: SPACING.spacing10,
    fontSize: 16,
    backgroundColor: COLORS.semiTransparent,
    textAlignVertical: "top",
    minHeight: 357,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 5,
    alignSelf: "center",
    color: COLORS.whiteText,
  },
});
