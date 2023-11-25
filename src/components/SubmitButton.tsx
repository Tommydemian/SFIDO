import { Pressable, PressableProps, Text, StyleSheet } from "react-native"
import { COLORS } from "../../assets/theme"

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
    backgroundColor: COLORS.bgBlack, 
    paddingHorizontal: 10, 
    borderRadius: 30,
    marginBottom: 20
  }, 
  submitText: {
    color: COLORS.withe, 
    fontWeight: 'bold',
    alignSelf: 'center', 
    textTransform: 'capitalize',
  }
})