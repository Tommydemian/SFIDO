import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/LoginScreen';
import { SignupScreen } from '../screens/SignupScreen';

export type AuthStackParams = {
  LoginScreen: undefined, 
  SignupScreen: undefined, 
}

const Stack = createNativeStackNavigator<AuthStackParams>();

export const AuthStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='SignupScreen'>
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} options={{headerTitle: 'Create Account'}} />
    </Stack.Navigator>
  );
}