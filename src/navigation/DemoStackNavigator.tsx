import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DemoPreviewMessageScreen } from "../screens/DemoPreviewMessageScreen";
import { DemoCreateMessageScreen } from "../screens/DemoCreateMessageScreen";

import { DemoMessageProvider } from "../contexts/DemoMessageContext";
import { BottomTabsNavigator } from "./BottomTabsNavigator";
import { DemoCreateMessageTextScreen } from "../screens/DemoCreateMessageTextScreen";

export type DemoStackParams = {
  DemoCreateMessageTextScreen: undefined;
  DemoCreateMessageScreen: undefined;
  DemoPreviewMessageScreen: {
    image: string;
    text: string;
    videoId?: string;
  };
  BottomTabs: undefined;
};

const Stack = createNativeStackNavigator<DemoStackParams>();

export const DemoStackNavigator = () => {
  return (
    <DemoMessageProvider>
      <Stack.Navigator
        initialRouteName="DemoCreateMessageTextScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="DemoCreateMessageTextScreen"
          component={DemoCreateMessageTextScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DemoCreateMessageScreen"
          component={DemoCreateMessageScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DemoPreviewMessageScreen"
          component={DemoPreviewMessageScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BottomTabs"
          component={BottomTabsNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </DemoMessageProvider>
  );
};
