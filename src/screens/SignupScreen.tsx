import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { SubmitButton } from '../components/SubmitButton';
import Spinner from 'react-native-loading-spinner-overlay';
import { signOut } from 'firebase/auth';
import { auth, firestore } from '../config/firebaseConfig';
import { AuthContext, AuthProvider } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../theme';
import { useForm, SubmitHandler } from "react-hook-form"
import { InputField } from '../components/InputField';

type FormData = {
  email: string;
  password: string;
}

export const SignupScreen = () => {

const context = useContext(AuthContext);

if (!context) {
  throw new Error('useContext must be used within a AuthProvider');
}

const { user, handleSignup, handleForgotPassword } = context;

  const navigation = useNavigation()

    const {control, handleSubmit, formState: {errors}} = useForm<FormData>()

  const onSubmit = handleSubmit((data) => {
    handleSignup( data.email, data.password, navigation, 'Home' )
  })

  return (
    <View style={styles.container}>
      <Text>whatever</Text>
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
      
      <SubmitButton onPress={onSubmit}>
        Sing Up
      </SubmitButton>

      <TouchableOpacity>
      <Text onPress={handleForgotPassword} style={styles.forgotPassword}>Forgot your password?</Text>
      </TouchableOpacity>

      <SubmitButton onPress={() => signOut(auth)}>
        sign out
      </SubmitButton>

    </View>
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