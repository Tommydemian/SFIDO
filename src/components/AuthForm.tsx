import { SubmitButton } from "./SubmitButton"
import { InputField } from "./InputField"
import { COLORS } from "../../assets/theme"
import { StyleSheet } from "react-native"
import { useForm, SubmitHandler } from "react-hook-form"
import { FormData } from "../types"
import { MaterialIcons, Entypo, AntDesign } from '@expo/vector-icons';
import { useEffect } from "react"
import { NunitoText } from "./NunitoText"

type Props = {
 children? : React.ReactNode
 submitButtonText : string
 onSignIn?: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>
}

export const AuthForm: React.FC<Props> = ({children, submitButtonText, onSignIn }) => {
  const {control, handleSubmit, formState: {errors}} = useForm<FormData>()

  // Display errors if there are any
  useEffect(() => {
    console.log(errors);
  }, [errors]);


    return (
        <>
      <InputField
      rules={{required: 'Email is required'}}
      name='email' 
      control={control}
      placeholder='jonhdoe@gmail.com'
      secureTextEntry={false}
      autoCapitalize='none'
      setVisibility={false}
      leftIcon={
        <AntDesign name="user" size={32} color={COLORS.whiteText} />}
      />
      
      
      <InputField 
      rules={{required: 'Password is required'}}
      name='password'
      setVisibility
      control={control}
      placeholder='●●●●●●●●'
      secureTextEntry={true}
      placeholderTextColor={COLORS.inputGrayText}
      autoCapitalize='none' 
      leftIcon={<Entypo name="lock" size={32} color={COLORS.whiteText} />}
      rightIcon={<Entypo name="eye" size={24} color={COLORS.blackSecondaryText} />}
        />
      
      {children}

      <SubmitButton customStyles={styles.signInButton} onPress={onSignIn}>
        <NunitoText>
        {submitButtonText}
        </NunitoText>
      </SubmitButton>
      </>
    )
}

const styles = StyleSheet.create({
    signInButton: {
        backgroundColor: COLORS.folly
      }
})