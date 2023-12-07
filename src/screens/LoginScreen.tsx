// React and React-native imports
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

// External libraries imports
import { useForm } from "react-hook-form";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import Spinner from 'react-native-loading-spinner-overlay';

// Custom Component imports
import { SubmitButton } from '../components/SubmitButton';
import { OrDivider } from '../components/OrDivider';
import { AuthContainer } from '../components/AuthContainer';
import { AuthSwitchLink } from '../components/AuthSwitchLink';
import { AuthForm } from '../components/AuthForm';
import { OfficialLogo } from '../components/OfficialLogo';
import { SfidoWhiteTextLogo } from '../components/SfidoWhiteTextLogo';
import { NunitoText } from '../components/NunitoText';
import { InputField } from '../components/InputField';

// Custom Hooks imports
import { useAuthContext } from '../hooks/useAuthContext';
import { useDialogVisibility } from '../hooks/useDialogVisibility';
import { useGoogleAuthentication } from '../hooks/useGoogleAuthentication';

// Types and Constants imports
import { FormData } from '../types';
import { COLORS } from '../../assets/theme';
import { AuthStackParams } from '../navigation/AuthStackNavigator';

// Estilos y otros recursos

type Props = NativeStackScreenProps<AuthStackParams, 'LoginScreen'>

const authbg = require('../../assets/images/authbg.png')

export const LoginScreen: React.FC<Props> = ({navigation}) => {
  // conext hook
  const {user, onGoogleButtonPress, isGoogleLinked, handleSignIn, errorMessageState, setErrorMessageState } = useAuthContext()

  // dialogVisibility hook
  const {isVisible, showDialog, hideDialog} = useDialogVisibility()

  // useGoogleAuth hook:
  const {handleOnGoogleButtonPress} = useGoogleAuthentication()

  // useForm hook
  const {control, handleSubmit, formState: {errors}, reset} = useForm<FormData>()

  // function sign in 
  const onSubmit = (data: FormData) => {
    handleSignIn(data.email, data.password, reset);
  };

  useEffect(() => {
    console.log(auth().currentUser);
  }, [])

  const clearErrorMessage = () => {
    setErrorMessageState(''); // Clear the error message
  };

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={user.loading}/>
      
     {/* bg image container */}
     <View style={StyleSheet.absoluteFill}>
        <Image source={authbg} style={{flex: 1}} />
      </View>

      <AuthContainer>

      <OfficialLogo style={{alignSelf: 'center'}}/>   
      <SfidoWhiteTextLogo style={{marginVertical: 10}} />
      
      {/* <DialogPopup visible={visible} email={email} setPassword={setPassword} googleCredential={googleCredential!} password={password} /> */}
      <NunitoText customStyles={styles.subHeader}>
      Your goals, your dreams, your journey means a lot.
      </NunitoText>

      <InputField
      autoCapitalize='none'
      control={control}
      placeholder='Email'
      name='email'
      onInputChange={clearErrorMessage} 
      rules={{
        required: 'Email is required', // Ensures the user does not leave the email field blank
        pattern: {
          value: /^\S+@\S+$/i, // Simple regex for email validation
          message: 'Please enter a valid email address' // Message to show if the regex test fails
        }
      }}
      />

      <InputField
      autoCapitalize='none'
      control={control}
      placeholder='Password'
      name='password'
      onInputChange={clearErrorMessage} 
      rules={{
        required: 'Password is required', // Ensures the password field is not left blank
        minLength: {
          value: 6, // You can set a minimum length for the password if you want
          message: 'Password must be at least 6 characters long' // Message for the minimum length
        }
      }}
      />

      <SubmitButton onPress={handleSubmit(onSubmit)}>Sing In</SubmitButton>
      
      {errorMessageState && <NunitoText customStyles={styles.errorMessage}>{errorMessageState}</NunitoText>}

      {/* <AuthForm 
      submitButtonText='Sign In'
      onSignIn={onSignIn}
      >
      <TouchableOpacity>
      <NunitoText onPress={() => navigation.navigate('EmailPromptModal')} customStyles={styles.forgotPassword}>Forgot your password?</NunitoText>
      </TouchableOpacity>
      </AuthForm> */}

      <OrDivider />

      <View style={styles.providerButtonsContainer}>
      <SubmitButton customStyles={styles.providerButton} onPress={handleOnGoogleButtonPress}>Google</SubmitButton>
      <SubmitButton customStyles={styles.providerButton}>Apple</SubmitButton>
      </View>

      <AuthSwitchLink actionText='Sign Up' navigationText='Dont have an account?' onActionPress={() => navigation.navigate('SignupScreen')}   />
    </AuthContainer>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.blackBg
  }, 
  forgotPassword: {
    alignSelf: 'flex-end', 
    color: COLORS.whiteText, 
    fontWeight: 'bold'
  }, 
  heroImage: {
  height: 250, // Ajusta según sea necesario
  resizeMode: 'contain', // Asegúrate de que la imagen se ajuste sin deformarse
  alignSelf: 'center',
  marginVertical: 20, // Ajusta el espacio vertical
}, 
providerButtonsContainer: {
  flexDirection: 'row', 
  justifyContent: 'space-around', 
  columnGap: 10, 
}, 
providerButton: {
  flexGrow: 1 // TODO: ask GPT
}, 
inputIconContainer: {
  flexDirection: 'row', 
  alignItems: 'center', 
  justifyContent: 'space-between',
  columnGap: 5, 
  width: '100%',
  backgroundColor: 'red'
}, 
signInButton: {
  backgroundColor: COLORS.folly
}, 
subHeader: {
  fontSize: 22, 
  textAlign: 'center',
}, 
errorMessage: {
  color: COLORS.errorRed
}
})