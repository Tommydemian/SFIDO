import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { UserProfileScreen } from '../screens/UserProfileScreen';
import { ConversationsScreen } from '../screens/ConversationsScreen';

import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { InspirationScreen } from '../screens/InspirationScreen';
import { Entypo } from '@expo/vector-icons';

export type TabNavigatorParams = {
    HomeScreen: undefined;
    UserProfileScreen: undefined;
    ConversationsScreen: undefined;
    InspirationScreen: undefined;
}

const Tab = createBottomTabNavigator<TabNavigatorParams>();

export const BottomTabsNavigator = () =>  {
  return (
      <Tab.Navigator initialRouteName='HomeScreen' screenOptions={{tabBarShowLabel: false, headerShown: false}}>
        <Tab.Screen name="HomeScreen" component={HomeScreen}
        options={{tabBarIcon: ({size, color}) => <Ionicons name="home-outline" size={size} color={color} />}}
        />
        <Tab.Screen name="UserProfileScreen" component={UserProfileScreen}
        options={{tabBarIcon: ({size, color}) => <AntDesign name="user" size={size} color={color} />}}
        />
        <Tab.Screen name="ConversationsScreen" component={ConversationsScreen}
        options={{tabBarIcon: ({size, color}) => <Ionicons name="chatbox-outline" size={size} color={color} />}}
        />
        <Tab.Screen name="InspirationScreen" component={InspirationScreen}
        options={{tabBarIcon: ({size, color}) => <Entypo name="list" size={size} color={color} />}}
        />
      </Tab.Navigator>
  );
}