// React and React-native imports
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity, Platform } from 'react-native';

// External libraries imports
import * as AppleAuthentication from 'expo-apple-authentication';
import { useForm } from "react-hook-form";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import Spinner from 'react-native-loading-spinner-overlay';
import { AntDesign, Entypo } from '@expo/vector-icons';

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
import { AbsoluteFillBgImage } from '../components/AbsoluteFillBgImage';
import { AppleButton } from '@invertase/react-native-apple-authentication';

// Custom Hooks imports
import { useDialogVisibility } from '../hooks/useDialogVisibility';
import { useGoogleAuthentication } from '../hooks/useGoogleAuthentication';

// Types and Constants imports
import { FormData } from '../types';
import { COLORS, SPACING } from '../../assets/theme';
import { AuthStackParams } from '../navigation/AuthStackNavigator';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { usePasswordVisibility } from '../hooks/usePasswordVisibility';
import { useAuthContext } from '../contexts/AuthContext';
import { useGoogleContext } from '../contexts/GoogleContext';

// Estilos y otros recursos

type Props = NativeStackScreenProps<AuthStackParams, 'LoginScreen'>

export const LoginScreen: React.FC<Props> = ({navigation}) => {

  const [formInputsCompleted, setFormInputsCompleted] = useState(false)

  const opacity = useSharedValue(0.7); // Initial opacity

  useEffect(() => {
    // Update opacity based on form completion
    opacity.value = withTiming(formInputsCompleted ? 1 : 0.5, {duration: 300})
  }, [formInputsCompleted]);

  // context hook
  const {user, handleSignIn, errorMessageSignIn, setErrorMessageSignIn } = useAuthContext()
  const {isGoogleLinked, onGoogleButtonPress, linkGoogleAccount} = useGoogleContext()

  const {handlPasswordSecured, isPaswordSecured} = usePasswordVisibility()

  // dialogVisibility hook
  const {isVisible, showDialog, hideDialog} = useDialogVisibility()

  // useGoogleAuth hook:
  const {handleOnGoogleButtonPress} = useGoogleAuthentication()

  // useForm hook
  const {control, handleSubmit, formState: {errors}, reset, watch} = useForm<FormData>()
  const email = watch('email')
  const password = watch('password')

  useEffect(() => {
    setFormInputsCompleted(email?.length > 0 && password?.length > 0);
  }, [email, password]);

  // function sign in 
  const onSubmit = (data: FormData) => {
    handleSignIn(data.email, data.password, reset);
  };

  useEffect(() => {
    console.log(auth().currentUser);
  }, [])

  const clearErrorMessage = () => {
    setErrorMessageSignIn(''); // Clear the error message
  };

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={user.loading}/>
      
     {/* bg image container */}
     <AbsoluteFillBgImage/>

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
      leftIcon={<AntDesign name="user" size={30} color={COLORS.whiteText} />}
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
      secureTextEntry={isPaswordSecured}
      onInputChange={clearErrorMessage} 
      handlePassworsSecured={handlPasswordSecured}
      leftIcon={<Entypo name="lock" size={30} color={COLORS.whiteText} />}
      rightIcon={<Entypo name="eye" size={24} color={COLORS.blackSecondaryText} />}
      rules={{
        required: 'Password is required', // Ensures the password field is not left blank
        minLength: {
          value: 6, // You can set a minimum length for the password if you want
          message: 'Password must be at least 6 characters long' // Message for the minimum length
        }
      }}
      />

      <SubmitButton 
      customStyles={styles.signInButton} 
      onPress={handleSubmit(onSubmit)}
      >
        <NunitoText type='bold' customStyles={styles.signInButtonText}>
          Sing In
        </NunitoText>
      </SubmitButton>
      
      {errorMessageSignIn && <NunitoText customStyles={styles.errorMessage}>{errorMessageSignIn}</NunitoText>}

      {/* <AuthForm 
      submitButtonText='Sign In'
      onSignIn={onSignIn}
      >
    </AuthForm> */}
    <TouchableOpacity>
    <NunitoText onPress={() => navigation.navigate('ForgotEmailScreen')} customStyles={styles.forgotPassword}>Forgot your password?</NunitoText>
    </TouchableOpacity>

      <OrDivider />

      <View style={styles.providerButtonsContainer}>
      {/* Apple Login */}
             <View style={styles.container}>
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={30}
        style={styles.button}
        onPress={async () => {
          try {
            const credential = await AppleAuthentication.signInAsync({
              requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
              ],
            });
            // signed in
          } catch (e) {
            if (e.code === 'ERR_REQUEST_CANCELED') {
              // handle that the user canceled the sign-in flow
            } else {
              // handle other errors
            }
          }
        }}
      />
    </View>
    <SubmitButton customStyles={styles.providerButton} onPress={handleOnGoogleButtonPress}>
        <NunitoText customStyles={styles.providerButtonText} type='bold'>Google</NunitoText>
        
        </SubmitButton>
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
    backgroundColor: COLORS.indigoDye
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
  justifyContent: 'center', 
  rowGap: SPACING.spacing20
}, 
providerButton: {
  flexGrow: 1, // TODO: ask GPT
  backgroundColor: COLORS.black
}, 
providerButtonText: {
  textAlign: 'center',
},
inputIconContainer: {
  flexDirection: 'row', 
  alignItems: 'center', 
  justifyContent: 'space-between',
  columnGap: 5, 
  width: '100%',
  backgroundColor: 'red'
}, 
signInButtonText: {
  textAlign: 'center', 
  fontSize: 18, 
  backgroundColor: 'transparent'
},
subHeader: {
  fontSize: 22, 
  textAlign: 'center',
}, 
errorMessage: {
  color: COLORS.errorRed
}, 
  button: {
    width: '100%',
    height: 44,
  },
});
