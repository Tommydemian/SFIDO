import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { COLORS } from '../../assets/theme';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useAuthContext } from '../contexts/AuthContext';

const screenHeight = Dimensions.get('window').height
 
export const UpperBarNav = () => {

  const {user} = useAuthContext()

  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      {/* <Image 
        source={{uri: user.profilePic}} // Reemplaza con la URL de la imagen del usuario
        style={styles.profileImage}
      /> */}
      <View style={styles.textContainer}>
        <Text style={styles.mainText}>Texto Principal</Text>
        <Text style={styles.secondaryText}>Texto Secundario</Text>
      </View>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => console.log('Icono presionado')}>
          <AntDesign name="setting" size={24} color={COLORS.orangeWeb} />
        </TouchableOpacity>
      </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: COLORS.blackBg, 
        width: '100%'
    },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    height: screenHeight * 0.1
    // Otros estilos que necesites
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20, // Esto hará la imagen circular
  },
  textContainer: {
    // Estilos para el contenedor de texto
  },
  mainText: {
    fontSize: 16,
    color: COLORS.whiteText
    // Otros estilos para el texto principal
  },
  secondaryText: {
    fontSize: 12,
    color: COLORS.whiteText
    // Otros estilos para el texto secundario
  },
  iconsContainer: {
    flexDirection: 'row',
    // Estilos para el contenedor de iconos
  },
});
