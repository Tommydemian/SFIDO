import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CraftMessageProvider } from "../contexts/CraftMessageContext";
import { PostMessageTextScreen } from "../screens/PostMessageTextScreen";
import { PostMessageMediaScreen } from "../screens/PostMessageMediaScreen";
import { PostMessageScreen } from "../screens/PostMessageScreen";

export type PostMessageStackParams = {
  PostMessageTextScreen: undefined;
  PostMessageMediaScreen: undefined;
  PostMessageScreen: {
    image: string;
    text: string;
    videoId?: string;
  };
};

const Stack = createNativeStackNavigator<PostMessageStackParams>();

export const PostStackNavigator = () => {
  return (
    <CraftMessageProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="PostMessageTextScreen"
          component={PostMessageTextScreen}
        />
        <Stack.Screen
          name="PostMessageMediaScreen"
          component={PostMessageMediaScreen}
        />
        <Stack.Screen name="PostMessageScreen" component={PostMessageScreen} />
      </Stack.Navigator>
    </CraftMessageProvider>
  );
};

const styles = StyleSheet.create({});
