// useTextInput.js
import { useRef, useCallback } from "react";
import { TextInput } from "react-native";
import { useSharedValue, withSpring } from "react-native-reanimated";
import { useDemoMessageContext } from "../contexts/DemoMessageContext";

export const useDemoTextInput = (initialValue?: string) => {
  const { text, setText } = useDemoMessageContext();
  const textInputRef = useRef<TextInput>(null);
  const scale = useSharedValue(1);

  const handleWriteMyOwn = useCallback(() => {
    scale.value = withSpring(1.1, { damping: 2 }, () => {
      scale.value = withSpring(1);
    });
    setText("");
    textInputRef.current?.focus();
  }, [setText, scale, textInputRef]);

  return { text, setText, textInputRef, scale, handleWriteMyOwn };
};
