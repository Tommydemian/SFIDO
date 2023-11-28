import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';

const screenHeight = Dimensions.get('window').height
 
export const UpperBarNav = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <Image 
        source={{ uri: 'url-de-tu-imagen' }} // Reemplaza con la URL de la imagen del usuario
        style={styles.profileImage}
      />
      <View style={styles.textContainer}>
        <Text style={styles.mainText}>Texto Principal</Text>
        <Text style={styles.secondaryText}>Texto Secundario</Text>
      </View>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => console.log('Icono presionado')}>
          <AntDesign name="setting" size={24} color="black" />
        </TouchableOpacity>
      </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: 'white'
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
    // Otros estilos para el texto principal
  },
  secondaryText: {
    fontSize: 12,
    // Otros estilos para el texto secundario
  },
  iconsContainer: {
    flexDirection: 'row',
    // Estilos para el contenedor de iconos
  },
});
