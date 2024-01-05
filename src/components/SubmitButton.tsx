import React from "react";
import {
  Pressable,
  PressableProps,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { BORDER, COLORS, FONT_SIZE, SPACING } from "../../assets/theme";
import { NunitoText } from "./Fonts/NunitoText";

type Props = PressableProps & {
  customStyles?: object;
  children: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  success?: boolean;
  error?: boolean;
};

export const SubmitButton: React.FC<Props> = ({
  customStyles,
  children,
  success,
  error,
  isLoading,
  disabled,
  ...rest
}) => {
  const renderChildren = () => {
    if (typeof children === "string") {
      return <NunitoText style={styles.buttonText}>{children}</NunitoText>;
    }
    return children;
  };

  return (
    <Pressable
      {...rest}
      style={({ pressed }) => [
        styles.submitButton,
        customStyles,
        disabled && styles.disabled,
        success && pressed && styles.success, // Success Styles
        error && pressed && styles.error, // Error Styles
        pressed && styles.pressed,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={COLORS.whiteText} />
      ) : (
        renderChildren()
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: COLORS.folly,
    paddingVertical: SPACING.spacing15,
    borderRadius: BORDER.buttons,
    marginVertical: 10,
  },
  buttonText: {
    color: COLORS.whiteText,
    fontSize: FONT_SIZE.buttonText,
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    backgroundColor: COLORS.inputGrayText,
  },
  success: {
    borderWidth: 1,
    borderColor: COLORS.successGreen,
  },
  error: {
    borderWidth: 1,
    borderColor: COLORS.errorRed,
  },
});
