import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MessageScreen } from "../screens/MessageScreen";
import { QuoteScreen } from "../screens/QuoteScreen";
import { CategoriesSelectionScreen } from "../screens/CategoriesSelectionScreen";
import { OnBoardingScreen } from "../screens/OnBoardingScreen";
import { DemoStackNavigator } from "./DemoStackNavigator";

export type MainStackParams = {
  QuoteScreen: undefined;
  MessageScreen: {
    email: string;
    id: string;
  };
  CategoriesSelectionScreen: undefined;
  OnBoardingScreen: undefined;
  DemoPreparationScreen: undefined;
  DemoStack: undefined;
};

const Stack = createNativeStackNavigator<MainStackParams>();

export const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="OnBoardingScreen">
      <Stack.Screen
        name="QuoteScreen"
        component={QuoteScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="MessageScreen" component={MessageScreen} />
      <Stack.Screen
        name="CategoriesSelectionScreen"
        component={CategoriesSelectionScreen}
        options={{
          headerShown: false,
          // presentation: "transparentModal",
        }}
      />
      <Stack.Screen
        name="OnBoardingScreen"
        component={OnBoardingScreen}
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        name="DemoStack"
        component={DemoStackNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
