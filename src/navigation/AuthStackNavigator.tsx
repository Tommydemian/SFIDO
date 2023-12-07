import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/LoginScreen';
import { SignupScreen } from '../screens/SignupScreen';
import { EmailPromptModal } from '../screens/EmailPromptModal';

export type AuthStackParams = {
  LoginScreen: undefined, 
  SignupScreen: undefined, 
  EmailPromptModal: undefined
}

const Stack = createNativeStackNavigator<AuthStackParams>();

export const AuthStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='LoginScreen'>
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} options={{headerTitle: 'Create Account', headerShown: false}} />
      <Stack.Screen name="EmailPromptModal" component={EmailPromptModal} options={{presentation: 'modal'}} />
    </Stack.Navigator>
  );
}