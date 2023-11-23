import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../theme'
import Spinner from 'react-native-loading-spinner-overlay'
import { useAuthContext } from '../hooks/useAuthContext'
import { InputField } from '../components/InputField'
import { SubmitButton } from '../components/SubmitButton'
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { useForm, SubmitHandler } from "react-hook-form"

type FormData = {
  email: string;
  password: string;
}

export const LoginScreen = () => {

  // conext hook
  const {user, handleForgotPassword, handleSignIn, signOutUser} = useAuthContext()

  // useForm hook
  const {control, handleSubmit, formState: {errors}} = useForm<FormData>()

  const onSignIn = handleSubmit((data) => {
    handleSignIn(data.email, data.password)
  })

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={user.loading}/>
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

      <SubmitButton onPress={signOutUser}>
        sign out
      </SubmitButton>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '5%', 
    justifyContent: 'center',
  }, 
  forgotPassword: {
    alignSelf: 'flex-end', 
    color: COLORS.ruddyBlue
  }
})