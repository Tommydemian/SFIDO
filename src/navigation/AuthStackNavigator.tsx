import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/LoginScreen';
import { SignupScreen } from '../screens/SignupScreen';
import { ForgotPasswordScreen } from '../screens/ForgotPasswordScreen';

export type AuthStackParams = {
  LoginScreen: undefined;
  SignupScreen: undefined; 
  ForgotPasswordScreen: undefined;
}

const Stack = createNativeStackNavigator<AuthStackParams>();

export const AuthStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='LoginScreen'>
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} options={{headerTitle: 'Create Account', headerShown: false}} />
      <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{headerTitle: 'Recover Password' }} />
    </Stack.Navigator>
  );
}