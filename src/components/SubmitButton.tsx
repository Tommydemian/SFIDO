import React from 'react';
import {
  Pressable,
  PressableProps,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { BORDER, COLORS, SPACING } from '../../assets/theme';

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
  return (
    <Pressable
      {...rest}
      style={({ pressed }) => [
        styles.submitButton,
        customStyles,
        disabled && styles.disabled,
        success && pressed && styles.success, // Estilo para éxito
        error && pressed && styles.error, // Estilo para error
        pressed && styles.pressed,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={COLORS.whiteText} />
      ) : (
        children
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: COLORS.folly,
    paddingVertical: SPACING.spacing10,
    borderRadius: BORDER.buttons,
    marginVertical: 10,
  },
  submitText: {
    color: COLORS.whiteText,
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'capitalize',
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
