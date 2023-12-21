import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DemoPreviewMessageScreen } from '../screens/DemoPreviewMessageScreen';
import { DemoCreateMessageScreen } from '../screens/DemoCreateMessageScreen';

import { DemoMessageProvider } from '../contexts/DemoMessageContext';

export type DemoStackParams = {
  DemoCreateMessageScreen: undefined; 
  DemoPreviewMessageScreen: {
    image: string;
    text: string;
    videoId?: string;
  };
}

const Stack = createNativeStackNavigator<DemoStackParams>();

export const DemoStackNavigator = () => {
  return (
    <DemoMessageProvider>
    <Stack.Navigator initialRouteName='DemoCreateMessageScreen' screenOptions={{headerShown: false}}>
      <Stack.Screen name="DemoCreateMessageScreen" component={DemoCreateMessageScreen} options={{headerShown: false}} />
      <Stack.Screen name="DemoPreviewMessageScreen" component={DemoPreviewMessageScreen} options={{headerShown: false}} />
    </Stack.Navigator>
    </DemoMessageProvider>
  );
}