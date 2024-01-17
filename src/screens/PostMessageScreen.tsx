import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useCraftMessageContext } from "../contexts/CraftMessageContext";

export const PostMessageScreen = () => {
  const { text } = useCraftMessageContext();

  useEffect(() => {
    console.log(text);
  }, []);

  return (
    <View>
      <Text>PostMessageScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
