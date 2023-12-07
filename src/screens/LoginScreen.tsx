import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, Pressable, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../../assets/theme'
import Spinner from 'react-native-loading-spinner-overlay'
import { useAuthContext } from '../hooks/useAuthContext'
import { InputField } from '../components/InputField'
import { SubmitButton } from '../components/SubmitButton'
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { useForm, SubmitHandler } from "react-hook-form"
import auth from '@react-native-firebase/auth';
import { OrDivider } from '../components/OrDivider'
import { AuthStackParams } from '../navigation/AuthStackNavigator'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { useFonts } from 'expo-font';
import { BlurView } from 'expo-blur';
import { AuthContainer } from '../components/AuthContainer'

import { SvgLogo } from '../components/SvgLogo'
import { FontAwesome } from '@expo/vector-icons';

import { DialogPopup } from '../components/DialogPopup'
import { isUserGoogleAccountLinked, setIsGoogleAccountLinkedToTrue } from '../services/userService'

import { AntDesign } from '@expo/vector-icons';
import { OfficialLogo } from '../components/OfficialLogo'
import { SfidoWhiteTextLogo } from '../components/SfidoWhiteTextLogo'

type FormData = {
  email: string;
  password: string;
}

type Props = NativeStackScreenProps<AuthStackParams, 'LoginScreen'>

type DraftUserCredentials = FirebaseAuthTypes.UserCredential & {
  email: string;
  googleCredential: FirebaseAuthTypes.AuthCredential;
}

const authbg = require('../../assets/images/authbg.png')
const sfidoName = require('../../assets/images/sfidoname.png')

export const LoginScreen: React.FC<Props> = ({navigation}) => {
const [visible, setIsVisible] = useState(false)
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [googleCredential, setGoogleCredential] = useState<FirebaseAuthTypes.AuthCredential | null>(null)

// TODO: Splash screen control here


  // conext hook
  const {user, handleSignIn, onGoogleButtonPress, isGoogleLinked } = useAuthContext()

  // useForm hook
  const {control, handleSubmit, formState: {errors}} = useForm<FormData>()

  const onSignIn = handleSubmit((data) => {
    handleSignIn(data.email, data.password)
  })

  useEffect(() => {
    console.log(auth().currentUser);
  }, [])

  const handleOnGoogleButtonPress = () => {
    onGoogleButtonPress()
    .then((res) => {
      const response = res as DraftUserCredentials
        if (!isGoogleLinked) { // need persistance here
          setIsVisible(true)
          setEmail(response.email)
          setGoogleCredential(response.googleCredential)
          setIsGoogleAccountLinkedToTrue(response.email)
          console.log(res, 'message'); 
        } else {
          'Account linked'
        }
      })
    }

  useEffect(() => {
    console.log(password);
  }, [password])

  const [fontsLoaded] = useFonts({
    'Nunito-Regular': require('../../assets/fonts/Nunito-Regular.ttf'),
  });
  
  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={user.loading}/>
      
     {/* Contenedor de imagen de fondo con desenfoque */}
     <View style={StyleSheet.absoluteFill}>
        <Image source={authbg} style={{flex: 1}} />

      </View>
      
      <AuthContainer>

      <OfficialLogo style={{alignSelf: 'center'}}/>
      
      <SfidoWhiteTextLogo style={{marginVertical: 10}} />
      

      {/* <DialogPopup visible={visible} email={email} setPassword={setPassword} googleCredential={googleCredential!} password={password} /> */}

      
      <Text style={{fontFamily: 'Nunito-Regular', color: COLORS.blackSecondaryText, fontSize: 22, textAlign: 'center', color: COLORS.whiteText }}>Your goals, your dreams, your journey means a lot.</Text>

      
      <InputField
      customStyles={styles.fieldInput}
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
      customStyles={styles.fieldInput}
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
      
      <TouchableOpacity>
      <Text onPress={() => navigation.navigate('EmailPromptModal')} style={styles.forgotPassword}>Forgot your password?</Text>
      </TouchableOpacity>

      <SubmitButton customStyles={styles.signInButton} onPress={onSignIn}>
        Sing In
      </SubmitButton>

      <OrDivider />

      <View style={styles.providerButtonsContainer}>
      <SubmitButton customStyles={styles.providerButton} onPress={handleOnGoogleButtonPress}>Google</SubmitButton>
      <SubmitButton customStyles={styles.providerButton}>Apple</SubmitButton>
      </View>

    <View style={{flexDirection: 'row', }}>
    <Text style={{fontFamily: 'Nunito-Regular', color: COLORS.whiteText}}>Dont have an account?</Text>
    
    <Pressable onPress={() => navigation.navigate('SignupScreen')}><Text
    style={{fontFamily: 'Nunito-Regular', color: COLORS.whiteText}}
    >Sign Up</Text></Pressable>
    </View>
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
}
})