// useTextInput.js
import { useRef, useCallback } from "react";
import { TextInput } from "react-native";
import { useSharedValue, withSpring } from "react-native-reanimated";
import { useCraftMessageContext } from "../contexts/CraftMessageContext";

export const useCraftMessageTextInput = () => {
  const { text, setText } = useCraftMessageContext();
  const textInputRef = useRef<TextInput>(null);
  const scale = useSharedValue(1);

  const handleWriteMyOwn = useCallback(() => {
    scale.value = withSpring(1.1, { damping: 2 }, () => {
      scale.value = withSpring(1);
    });
    setText((prevState) => ({ ...prevState, content: "" }));
    textInputRef.current?.focus();
  }, [setText, scale, textInputRef]);

  return { text, setText, textInputRef, scale, handleWriteMyOwn };
};
