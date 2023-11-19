import { Pressable, PressableProps, Text, StyleSheet } from "react-native"
import { COLORS } from "../theme"

type Props = PressableProps & {
    customStyles?: object
    children: React.ReactNode
}

export const SubmitButton: React.FC<Props> = ({customStyles,children, ...rest}) => {
    return (
    <Pressable 
    {...rest}
    style={[styles.submitButton]}
    >
        <Text style={styles.submitText}>{children}</Text>
    </Pressable>)
}

const styles = StyleSheet.create({
  submitButton: {
    marginVertical: 20, 
    paddingVertical: 10, 
    backgroundColor: COLORS.oxfordBlue, 
    paddingHorizontal: 10, 
    borderRadius: 10
  }, 
  submitText: {
    color: COLORS.white, 
    fontWeight: 'bold',
    alignSelf: 'center' 
  }
})