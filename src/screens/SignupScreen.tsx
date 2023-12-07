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

export const SignupScreen: React.FC<Props> = ({navigation}) => {

  // conext hook
  const {user, handleSignup, onGoogleButtonPress, isGoogleLinked, errorMessageState, setErrorMessageState } = useAuthContext()

  // dialogVisibility hook
  const {isVisible, showDialog, hideDialog} = useDialogVisibility()

  // useGoogleAuth hook:
  const {handleOnGoogleButtonPress} = useGoogleAuthentication()

// useForm hook initialization with validation mode set to 'onChange'
const { control, handleSubmit, formState: { errors }, setError, reset, clearErrors } = useForm<FormData>({
  mode: 'onChange' // This triggers validation on change
});

// Rules for the email input field
const emailRules = {
  required: 'Email is required',
  pattern: {
    value: /^\S+@\S+$/i,
    message: 'Invalid email format'
  }
};

// Rules for the password input field
const passwordRules = {
  required: 'Password is required',
  minLength: {
    value: 6,
    message: 'Password must be at least 6 characters'
  }
}

  // function sign up
  const onSubmit = ({email, password}: FormData) => {
    handleSignup(email, password, reset);
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
      
      {/* Contenedor de imagen de fondo */}
      <View style={StyleSheet.absoluteFill}>
        <Image source={authbg} style={{flex: 1}} />
      </View>

      <AuthContainer>
        <OfficialLogo style={{alignSelf: 'center'}}/>   
        <SfidoWhiteTextLogo style={{marginVertical: 10}} />

        {/* Texto descriptivo para la pantalla de registro */}
        <NunitoText customStyles={styles.subHeader}>
          Join us and start your journey
        </NunitoText>
        
      <InputField
      autoCapitalize='none'
      control={control}
      placeholder='Email'
      onInputChange={clearErrorMessage} 
      name='email'
      rules={emailRules}
      
      />

      <InputField
      autoCapitalize='none'
      control={control}
      placeholder='Password'
      onInputChange={clearErrorMessage}
      name='password'
      rules={passwordRules}
      />

      <SubmitButton onPress={handleSubmit(onSubmit)}>Sing Up</SubmitButton>
      
      {errorMessageState && <NunitoText customStyles={styles.errorMessage}>{errorMessageState}</NunitoText>}

        <OrDivider />

        {/* Botones para registro con Google/Apple si son necesarios */}
        <View style={styles.providerButtonsContainer}>
          <SubmitButton customStyles={styles.providerButton}>Google</SubmitButton>
          <SubmitButton customStyles={styles.providerButton}>Apple</SubmitButton>
        </View>

        {/* Enlace para cambiar a la pantalla de inicio de sesión */}
        <AuthSwitchLink 
          actionText='Sign In' 
          navigationText='Already have an account?' 
          onActionPress={() => navigation.navigate('LoginScreen')} 
        />
      </AuthContainer>
    </SafeAreaView>
  );
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

