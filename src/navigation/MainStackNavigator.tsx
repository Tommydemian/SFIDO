import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { MessageScreen } from '../screens/MessageScreen';
import { QuoteScreen } from '../screens/QuoteScreen';
import {WelcomeScreen} from '../screens/WelcomeScreen';
import { InterestSelectionScreen } from '../screens/InterestSelectionScreen';

export type MainStackParams = {
    HomeScreen: undefined;
    QuoteScreen: undefined;
    MessageScreen: {
        email: string
        id: string
    };
    WelcomeScreen: undefined;
    InterestSelectionScreen: undefined;
}

const Stack = createNativeStackNavigator<MainStackParams>();

export const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='WelcomeScreen'>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}} />
      <Stack.Screen name="QuoteScreen" component={QuoteScreen} options={{headerShown: false}} />
      <Stack.Screen name="MessageScreen" component={MessageScreen} />
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{headerShown: false}} />
      <Stack.Screen name="InterestSelectionScreen" component={InterestSelectionScreen} options={{headerTitle: 'Select your interests'}} />
    </Stack.Navigator>
  );
}