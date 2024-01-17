import { StyleSheet, StatusBar, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { SubmitButton } from "../components/SubmitButton";
import { NunitoText } from "../components/Fonts/NunitoText";

import { UpperBarNav } from "../components/UpperBarNav";

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { TabNavigatorParams } from "../navigation/BottomTabsNavigator";
import { COLORS } from "../../assets/theme";
import { useAuthContext } from "../contexts/AuthContext";

type Props = BottomTabScreenProps<TabNavigatorParams, "HomeScreen">; // Updated Props type

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { user, signOutUser } = useAuthContext();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} backgroundColor={COLORS.blackBg} />
      <UpperBarNav />

      <View style={{ width: "50%", alignSelf: "center" }}>
        <SubmitButton
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={signOutUser}
        >
          <NunitoText
            type="bold"
            style={{ textAlign: "center", alignSelf: "center" }}
          >
            Sign out
          </NunitoText>
        </SubmitButton>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.blueNCS,
  },
});
