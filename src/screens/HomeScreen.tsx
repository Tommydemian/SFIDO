import { StyleSheet, Text, TouchableOpacity, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { SubmitButton } from "../components/SubmitButton";
import { User } from "../types";
import { NunitoText } from "../components/Fonts/NunitoText";

import { UpperBarNav } from "../components/UpperBarNav";

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { format } from "date-fns";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { TabNavigatorParams } from "../navigation/BottomTabsNavigator";
import { COLORS } from "../../assets/theme";
import { useAuthContext } from "../contexts/AuthContext";

type Props = BottomTabScreenProps<TabNavigatorParams, "HomeScreen">; // Updated Props type

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [users, setUsers] = useState<User[]>([]);
  const { user, signOutUser } = useAuthContext();

  useEffect(() => {
    const subscriber = firestore()
      .collection("users")
      .onSnapshot((collectionSnapshot) => {
        const usersData = collectionSnapshot.docs
          .map((doc) => doc.data() as User)
          .filter((user) => user.email !== auth().currentUser?.email);
        setUsers(usersData);
      });

    return () => subscriber();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} backgroundColor={COLORS.blackBg} />
      <UpperBarNav />

      {users.map((user) => (
        <TouchableOpacity
          key={user.uid}
          onPress={() =>
            navigation.navigate("MessageScreen", {
              id: user.uid,
              email: user.email,
            })
          }
        >
          <Text>{user.email}</Text>
          <Text>{format(user.insertedAt.toDate(), "PPP")}</Text>
        </TouchableOpacity>
      ))}

      <SubmitButton onPress={signOutUser}>
        <NunitoText>Sign out</NunitoText>
      </SubmitButton>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
