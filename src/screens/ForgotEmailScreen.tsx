import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator } from 'react-native'
import React from 'react'

import Spinner from 'react-native-loading-spinner-overlay'
import { useForm } from "react-hook-form";
import { AntDesign, Entypo } from '@expo/vector-icons';

import { InputField } from '../components/InputField'
import { SubmitButton } from '../components/SubmitButton'
import { AuthContainer } from '../components/AuthContainer'
import { AbsoluteFillBgImage } from '../components/AbsoluteFillBgImage'
import { NunitoText } from '../components/NunitoText'

import { useAuthContext } from '../contexts/AuthContext'

import { FormData } from '../types'
import { FONT_SIZE, COLORS, SPACING } from '../../assets/theme'

import {NativeStackScreenProps} from '@react-navigation/native-stack'
import { AuthStackParams } from '../navigation/AuthStackNavigator'


type ForgotPasswordNavigationProps = NativeStackScreenProps<AuthStackParams, 'ForgotEmailScreen'>


const ForgotEmailScreen: React.FC<ForgotPasswordNavigationProps> = ({navigation}) => {

    const {user, handleForgotPassword, errorMessageForgotPassword, setErrorMessageForgotPassword  } = useAuthContext() 

    // useForm hook
    const { control, handleSubmit, formState: { errors }, setError, reset, clearErrors } = useForm<FormData>({
        mode: 'onChange' // This triggers validation on change
      });
  const clearErrorMessage = () => {
    setErrorMessageForgotPassword(''); // Clear the error message
  };

  const onHandleForgotPassword = (data: FormData) => {
    handleForgotPassword(data.email)
      .then((message) => {
        console.log(message); // "Email sent successfully"
        navigation.navigate('LoginScreen');
      })
      .catch((err) => {
        console.log(err); // Manejo de errores
      });
  };
  
    

    // TODO: ??
    if (user.loading) return <Spinner visible={user.loading}/>

  return (
    <SafeAreaView style={styles.container}>
      {/* bg image container */}
      <AbsoluteFillBgImage/>
       <AuthContainer>
      <NunitoText type='bold' customStyles={styles.title}>Forgot Password?</NunitoText>
      <NunitoText customStyles={styles.subtitle} type='regular'>Do not worry! we will help you recover your password</NunitoText>
      
      <InputField
      autoCapitalize='none'
      control={control}
      placeholder='Email'
      name='email'
      leftIcon={<AntDesign name="mail" size={35} color={COLORS.whiteText} />}
      onInputChange={clearErrorMessage} 
      rules={{
        required: 'Email is required', // Ensures the user does not leave the email field blank
        pattern: {
          value: /^\S+@\S+$/i, // Simple regex for email validation
          message: 'Please enter a valid email address' // Message to show if the regex test fails
        }
      }}
      />

      <SubmitButton onPress={handleSubmit(onHandleForgotPassword)}><NunitoText customStyles={styles.submitButtonText} type='bold'>Send</NunitoText></SubmitButton>

      {errorMessageForgotPassword && <NunitoText customStyles={styles.errorMessage}>{errorMessageForgotPassword}</NunitoText>}
      

      </AuthContainer>
    </SafeAreaView>
  )
}

export default ForgotEmailScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.indigoDye
    }, 
    title: {
        fontSize: 35,
        alignSelf: 'center',
        marginVertical: SPACING.spacing20
    }, 
    subtitle: {
        fontSize: 16, 
        marginBottom: SPACING.spacing10
    }, 
    submitButtonText: {
        textAlign: 'center',
        fontSize: 18
    }, 
    errorMessage: {
        color: COLORS.errorRed
      },
})