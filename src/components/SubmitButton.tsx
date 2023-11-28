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
    backgroundColor: COLORS.orangeWeb, 
    paddingHorizontal: 10, 
    borderRadius: 30,
    marginBottom: 20
  }, 
  submitText: {
    color: COLORS.whiteText, 
    fontWeight: 'bold',
    alignSelf: 'center', 
    textTransform: 'capitalize',
  }
})