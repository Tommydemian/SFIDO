import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Pressable } from 'react-native'
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { SubmitButton } from '../components/SubmitButton';
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../theme';
import { useForm, SubmitHandler } from "react-hook-form"
import { InputField } from '../components/InputField';
import { useAuthContext } from '../hooks/useAuthContext';

type FormData = {
  email: string;
  password: string;
}

export const SignupScreen = () => {

  // context val extraction 
  const {handleSignup, user, handleForgotPassword, signOutUser} = useAuthContext()

  // useForm hook
  const {control, handleSubmit, formState: {errors}} = useForm<FormData>()

  const onSubmit = handleSubmit((data) => {
    handleSignup( data.email, data.password)
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

      <SubmitButton onPress={signOutUser}>
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