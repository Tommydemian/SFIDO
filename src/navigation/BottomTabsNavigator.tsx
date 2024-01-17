import React from "react";
import {
  StyleSheet,
  TouchableOpacityProps,
  TouchableOpacity,
  View,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/HomeScreen";
import { UserProfileScreen } from "../screens/UserProfileScreen";
import { ConversationsScreen } from "../screens/ConversationsScreen";
// import { NunitoText } from "../components/Fonts/NunitoText";

import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { InspirationScreen } from "../screens/InspirationScreen";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { COLORS, ICON_SIZE, SPACING } from "../../assets/theme";
import { PostStackNavigator } from "./PostStackNavigator";

export type TabNavigatorParams = {
  HomeScreen: undefined;
  UserProfileScreen: undefined;
  PostStack: undefined;
  ConversationsScreen: undefined;
  InspirationScreen: undefined;
};

const Tab = createBottomTabNavigator<TabNavigatorParams>();

type Props = TouchableOpacityProps & {
  children: React.ReactNode;
};

const CustomTabBarButton: React.FC<Props> = ({
  children,
  onPress,
  ...rest
}) => {
  return (
    <TouchableOpacity
      style={{
        justifyContent: "center",
        alignItems: "center",
        ...styles.shadow,
      }}
      onPress={onPress}
      {...rest}
    >
      <View
        style={{
          width: 70,
          height: 70,
          borderRadius: 35,
          backgroundColor: COLORS.folly,
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
};

export const BottomTabsNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: { ...styles.tabBar },
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarActiveTintColor: COLORS.folly,
          tabBarIcon: ({ size, color }) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 25,
              }}
            >
              <Ionicons name="home-outline" size={25} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="UserProfileScreen"
        component={UserProfileScreen}
        options={{
          tabBarActiveTintColor: COLORS.folly,
          tabBarIcon: ({ size, color }) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 25,
              }}
            >
              <AntDesign name="user" size={25} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="PostStack"
        component={PostStackNavigator}
        options={{
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ size, color }) => (
            <AntDesign
              name="plus"
              size={ICON_SIZE.mediaActions}
              color={COLORS.whiteSmoke}
            />
          ),
          tabBarButton: (props: Props) => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="ConversationsScreen"
        component={ConversationsScreen}
        options={{
          tabBarActiveTintColor: COLORS.folly,
          tabBarIcon: ({ size, color }) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 25,
              }}
            >
              <FontAwesome5 name="file-archive" size={25} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="InspirationScreen"
        component={InspirationScreen}
        options={{
          tabBarActiveTintColor: COLORS.folly,
          tabBarIcon: ({ size, color }) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 25,
              }}
            >
              <Entypo name="list" size={25} color={color} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 25,
    left: 20,
    right: 20,
    backgroundColor: COLORS.ghostWhite,
    borderRadius: SPACING.spacing15,
    justifyContent: "center",
    alignItems: "center",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
