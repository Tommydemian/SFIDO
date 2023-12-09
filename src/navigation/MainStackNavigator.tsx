import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MessageScreen } from '../screens/MessageScreen';
import { QuoteScreen } from '../screens/QuoteScreen';
import {WelcomeScreen} from '../screens/WelcomeScreen';
import { BottomTabsNavigator } from './BottomTabsNavigator';
import { CategoriesSelectionScreen } from '../screens/CategoriesSelectionScreen';
import {OnBoardingScreen} from '../screens/OnBoardingScreen';

export type MainStackParams = {
    QuoteScreen: undefined;
    MessageScreen: {
        email: string
        id: string
    };
    WelcomeScreen: undefined;
    CategoriesSelectionScreen: undefined;
    BottomTabs: undefined;
    OnBoardingScreen: undefined;
}

const Stack = createNativeStackNavigator<MainStackParams>();

export const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='OnBoardingScreen'>
      <Stack.Screen name="QuoteScreen" component={QuoteScreen} options={{headerShown: false}} />
      <Stack.Screen name="MessageScreen" component={MessageScreen} />
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{headerShown: false}} />
      <Stack.Screen name='CategoriesSelectionScreen' component={CategoriesSelectionScreen} options={{headerShown: false}} />
      <Stack.Screen name="BottomTabs" component={BottomTabsNavigator} options={{headerShown: false}} />
      <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  );
}