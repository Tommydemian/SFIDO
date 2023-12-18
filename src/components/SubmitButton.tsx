import { Pressable, PressableProps, Text, StyleSheet, ActivityIndicator } from "react-native"
import { BORDER, COLORS } from "../../assets/theme"

type Props = PressableProps & {
    customStyles?: object;
    children: React.ReactNode;
    isLoading?: boolean;
    disabled?: boolean;
}

export const SubmitButton: React.FC<Props> = ({customStyles,children, isLoading, disabled, ...rest}) => {
    return (
    <Pressable 
    {...rest}
    style={({ pressed }) => [
      styles.submitButton,
      customStyles,
      pressed && styles.pressed, // Estilo cuando el botón está presionado
      disabled && styles.disabled // Estilo para el estado deshabilitado
    ]}
    >
       {isLoading ? (
        <ActivityIndicator size="small" color={COLORS.whiteText} />
      ) : (
        children
      )}
    </Pressable>)
}

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: COLORS.folly, 
    paddingVertical: 15, 
    borderRadius: BORDER.buttons,
    marginVertical: 10, 
    // paddingHorizontal: 10, 
    // marginBottom: 20
  }, 
  submitText: {
    color: COLORS.whiteText, 
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center', 
    textTransform: 'capitalize',
  },
  pressed: {
    backgroundColor: COLORS.ligthFolly
  },
  disabled: {
    backgroundColor: COLORS.inputGrayText
  }
})