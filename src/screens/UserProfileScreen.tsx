import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  Dimensions,
  FlatList,
  Pressable,
} from "react-native";
import React from "react";
import {
  BORDER,
  COLORS,
  FONT_SIZE,
  ICON_SIZE,
  SPACING,
} from "../../assets/theme";
import { userProfileData } from "../../assets/constants/data";
import { NunitoText } from "../components/Fonts/NunitoText";
import { CustomIcon } from "../components/CustomIcon";

const SCREEN_HEIGHT = Dimensions.get("screen").height;

export const UserProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileImageContainer}>
        <Image
          source={{
            uri: "https://w7.pngwing.com/pngs/419/473/png-transparent-computer-icons-user-profile-login-user-heroes-sphere-black-thumbnail.png",
          }}
          style={styles.profileImage}
        />
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={userProfileData}
          keyExtractor={(item) => item.id.toString()}
          style={styles.profileList}
          contentContainerStyle={styles.profileListContentContainerStyle}
          renderItem={({ item, index }) => {
            return (
              <Pressable>
                <View style={styles.listItem}>
                  <NunitoText customStyles={styles.listText} type="semiBold">
                    {item.title}
                  </NunitoText>
                  <CustomIcon
                    library="FontAwesome5"
                    name={item.icon}
                    size={ICON_SIZE.default}
                    color={COLORS.ghostWhite}
                    customStyles={styles.listIcon}
                  />
                </View>
              </Pressable>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.blueNCS,
  },
  profileImageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: SPACING.spacing20,
    height: SCREEN_HEIGHT * 0.1,
    backgroundColor: COLORS.ghostWhite,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: BORDER.circle,
  },
  profileList: {
    width: "80%",
    backgroundColor: COLORS.blackBg,
    alignSelf: "center",
    paddingTop: SPACING.spacing15,
    marginTop: SPACING.spacing40,
    borderRadius: BORDER.border20,
  },
  profileListContentContainerStyle: {
    // justifyContent: "center",
  },
  listItem: {
    paddingVertical: SPACING.spacing20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  listContainer: {
    height: SCREEN_HEIGHT * 0.6,
  },
  listText: {
    textAlign: "left",
    paddingLeft: SPACING.spacing10,
    fontSize: FONT_SIZE.screenTitle,
  },
  listIcon: {
    paddingRight: SPACING.spacing10,
  },
});
