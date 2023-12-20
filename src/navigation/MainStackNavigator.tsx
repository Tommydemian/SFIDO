import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MessageScreen } from '../screens/MessageScreen';
import { QuoteScreen } from '../screens/QuoteScreen';
import { BottomTabsNavigator } from './BottomTabsNavigator';
import { CategoriesSelectionScreen } from '../screens/CategoriesSelectionScreen';
import {OnBoardingScreen} from '../screens/OnBoardingScreen';
import { DemoSettedScren } from '../screens/DemoSettedScreen';
import {DemoPreparationScreen} from '../screens/DemoPreparationScreen';

export type MainStackParams = {
    QuoteScreen: undefined;
    MessageScreen: {
        email: string
        id: string
    };
    CategoriesSelectionScreen: undefined;
    BottomTabs: undefined;
    OnBoardingScreen: undefined;
    DemoPreparationScreen: undefined;
    DemoSettedScreen: {
      image: string;
      text: string;
      videoId: string;
    };
}

const Stack = createNativeStackNavigator<MainStackParams>();

export const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='OnBoardingScreen'>
      <Stack.Screen name="QuoteScreen" component={QuoteScreen} options={{headerShown: false}} />
      <Stack.Screen name="MessageScreen" component={MessageScreen} />
      <Stack.Screen name='CategoriesSelectionScreen' component={CategoriesSelectionScreen} options={{headerShown: false}} />
      <Stack.Screen name="BottomTabs" component={BottomTabsNavigator} options={{headerShown: false}} />
      <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} options={{headerShown: false}} />
      <Stack.Screen name="DemoSettedScreen" component={DemoSettedScren} options={{headerShown: false}} />
      <Stack.Screen name="DemoPreparationScreen" component={DemoPreparationScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  );
}