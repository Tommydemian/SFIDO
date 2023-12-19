// useTextInput.js
import { useState, useRef } from 'react';
import { TextInput } from 'react-native';
import { useSharedValue, withSpring } from 'react-native-reanimated';

export const useDemoTextInput = (initialValue?: string) => {
  const [text, setText] = useState(initialValue);
  const textInputRef = useRef<TextInput>(null);
  const scale = useSharedValue(1);

  const handleWriteMyOwn = () => {
    scale.value = withSpring(1.1, { damping: 2 }, () => {
      scale.value = withSpring(1);
    });
    setText('');
    textInputRef.current?.focus();
  };

  return { text, setText, textInputRef, scale, handleWriteMyOwn };
};
