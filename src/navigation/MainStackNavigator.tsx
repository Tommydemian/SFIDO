import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { MessageScreen } from '../screens/MessageScreen';
import { QuoteScreen } from '../screens/QuoteScreen';

export type MainStackParams = {
    HomeScreen: undefined;
    QuoteScreen: undefined;
    MessageScreen: {
        email: string
        id: string
    };
}

const Stack = createNativeStackNavigator<MainStackParams>();

export const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='QuoteScreen'>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}} />
      <Stack.Screen name="QuoteScreen" component={QuoteScreen} options={{headerShown: false}} />
      <Stack.Screen name="MessageScreen" component={MessageScreen} />
    </Stack.Navigator>
  );
}