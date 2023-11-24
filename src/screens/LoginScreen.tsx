import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, Button } from 'react-native'
import React, { useEffect } from 'react'
import { COLORS } from '../theme'
import Spinner from 'react-native-loading-spinner-overlay'
import { useAuthContext } from '../hooks/useAuthContext'
import { InputField } from '../components/InputField'
import { SubmitButton } from '../components/SubmitButton'
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { useForm, SubmitHandler } from "react-hook-form"
// import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId: '86924702179-fkg4evrmr3rcu1om8np5gg898v73u5j6.apps.googleusercontent.com',
});

type FormData = {
  email: string;
  password: string;
}


async function onGoogleButtonPress() {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const response = await GoogleSignin.signIn();
    console.log('Google Sign-In response:', response);

    if (response && response.idToken) {
      const googleCredential = auth.GoogleAuthProvider.credential(response.idToken);
      return auth().signInWithCredential(googleCredential);
    } else {
      console.log('No idToken received');
    }
  } catch (error) {
    console.error('Google Sign-In Error: ', error);
  }
}




// async function onGoogleButtonPress() {
//   // Get the users ID token
//   const { idToken } = await GoogleSignin.signIn();

//   // Create a Google credential with the token
//   const googleCredential = auth.GoogleAuthProvider.credential(idToken);

//   // Sign-in the user with the credential
//   return auth().signInWithCredential(googleCredential);

// }


export const LoginScreen = () => {

  // conext hook
  const {user, handleForgotPassword, handleSignIn, signOutUser} = useAuthContext()

  // useForm hook
  const {control, handleSubmit, formState: {errors}} = useForm<FormData>()

  const onSignIn = handleSubmit((data) => {
    handleSignIn(data.email, data.password)
  })

  useEffect(() => {
    console.log(auth().currentUser);
    
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={user.loading}/>

      <Image style={styles.heroImage} source={require('../../assets/images/loginwolf.png')}></Image>

      <InputField
      rules={{required: 'Email is required'}}
      name='email' 
      control={control}
      label='Email'
      placeholder='JonhDoe@gmail.com'
      secureTextEntry={false}
      autoCapitalize='none'
      setVisibility={false}
      leftIcon={<MaterialIcons name="email" size={24} color={COLORS.richBlack} />} />
      
      <InputField 
      rules={{required: 'Password is required'}}
      name='password'
      setVisibility
      control={control}
      label='Password'
      placeholder='●●●●●●●●'
      secureTextEntry={true}
      autoCapitalize='none'
      leftIcon={<Entypo name="lock" size={24} color={COLORS.richBlack} />} 
      rightIcon={<Entypo name="eye" size={24} color={COLORS.richBlack} />}
        />
      
      <SubmitButton onPress={onSignIn}>
        Sing In
      </SubmitButton>

      <TouchableOpacity>
      <Text onPress={handleForgotPassword} style={styles.forgotPassword}>Forgot your password?</Text>
      </TouchableOpacity>

      <Button
      title="Google Sign-In"
      onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
    />

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '5%', 
    justifyContent: 'center',
    backgroundColor: 'white'
  }, 
  forgotPassword: {
    alignSelf: 'flex-end', 
    color: COLORS.ruddyBlue
  }, 
  heroImage: {
    height: 200, 
    alignSelf: 'center'
  }
})