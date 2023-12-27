import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
} from "react-native";
import { COLORS, ICON_SIZE } from "../../assets/theme";
import { useAuthContext } from "../contexts/AuthContext";

import { NunitoText } from "./Fonts/NunitoText";
import { CustomIcon } from "./CustomIcon";

const screenHeight = Dimensions.get("window").height;

export const UpperBarNav = () => {
  const { user } = useAuthContext();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          source={{
            uri: "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg",
          }} // Reemplaza con la URL de la imagen del usuario
          style={styles.profileImage}
        />
        <View style={styles.textContainer}>
          <Text style={styles.mainText}>Texto Principal</Text>
          <NunitoText>{user.email}</NunitoText>
        </View>
        <View style={styles.iconsContainer}>
          <TouchableOpacity>
            <CustomIcon
              library="AntDesign"
              name="setting"
              size={ICON_SIZE.default}
              color={COLORS.whiteText}
              onPress={() => console.log("icon")}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.indigoDye,
    width: "100%",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    height: screenHeight * 0.1,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  textContainer: {
    // Estilos para el contenedor de texto
  },
  mainText: {
    fontSize: 16,
    color: COLORS.whiteText,
    // Otros estilos para el texto principal
  },
  secondaryText: {
    fontSize: 12,
    color: COLORS.whiteText,
    // Otros estilos para el texto secundario
  },
  iconsContainer: {
    flexDirection: "row",
    // Estilos para el contenedor de iconos
  },
});
