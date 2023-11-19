import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { MessageScreen } from '../screens/MessageScreen';

export type MainStackParams = {
    HomeScreen: undefined;
    MessageScreen: {
        email: string
        id: string
    };
}

const Stack = createNativeStackNavigator<MainStackParams>();

export const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='HomeScreen'>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="MessageScreen" component={MessageScreen} />
    </Stack.Navigator>
  );
}