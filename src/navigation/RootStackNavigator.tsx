import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainStackNavigator } from "./MainStackNavigator";
import { EmailPromptModal } from "../screens/EmailPromptModal";

export type RootStackParams = {
  Main: undefined;
  EmailPromptModal: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParams>();

export const RootStackNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="Main" component={MainStackNavigator} />
      <RootStack.Screen
        name="EmailPromptModal"
        component={EmailPromptModal}
        options={{ presentation: "containedModal" }}
      />
    </RootStack.Navigator>
  );
};
