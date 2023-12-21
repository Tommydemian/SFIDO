import React from "react";
import { TextInput, StyleSheet, Dimensions } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useDemoTextInput } from "../../hooks/useDemoTextInput";
import { useDemoMessageContext } from "../../contexts/DemoMessageContext";

type Props = {
  placeholder: string;
  render: (props: RenderProps) => React.ReactNode;
};

type RenderProps = {
  handleWriteMyOwn: () => void;
};

const { width } = Dimensions.get("window");

export const DemoTextInput: React.FC<Props> = ({ placeholder, render }) => {
  const { scale, textInputRef, handleWriteMyOwn } = useDemoTextInput(
    "Remember why you started. Every step brings you closer to your goals. Keep pushing forward!",
  );

  const { text, setText } = useDemoMessageContext();

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <>
      <Animated.View style={animatedStyles}>
        <TextInput
          ref={textInputRef}
          style={styles.textInput}
          value={text}
          multiline={true}
          placeholder={placeholder}
          onChangeText={(newText) => setText(newText)}
          keyboardType="default"
        />
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
    color: "#333333",
    backgroundColor: "#FFFFFFAA", // Semi-transparente
    textAlignVertical: "top",
    minHeight: 150,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignSelf: "center",
    marginVertical: 20,
  },
});
