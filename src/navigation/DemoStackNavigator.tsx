import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DemoPreviewMessageScreen } from "../screens/DemoPreviewMessageScreen";

import { CraftMessageProvider } from "../contexts/CraftMessageContext";
import { BottomTabsNavigator } from "./BottomTabsNavigator";
import { DemoCreateMessageTextScreen } from "../screens/DemoCreateMessageTextScreen";
import { DemoCreateMessageMediaScreen } from "../screens/DemoCreateMessageMediaScreen";

export type DemoStackParams = {
  DemoCreateMessageTextScreen: undefined;
  DemoCreateMessageMediaScreen: undefined;
  DemoPreviewMessageScreen: undefined;
  BottomTabs: undefined;
};

const Stack = createNativeStackNavigator<DemoStackParams>();

export const DemoStackNavigator = () => {
  return (
    <CraftMessageProvider>
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
          name="DemoCreateMessageMediaScreen"
          component={DemoCreateMessageMediaScreen}
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
    </CraftMessageProvider>
  );
};
