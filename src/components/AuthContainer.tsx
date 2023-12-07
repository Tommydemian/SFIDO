import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';

type Props = {
    children: React.ReactNode
}

// get window dimensions
const { width, height } = Dimensions.get('window');

export const AuthContainer: React.FC<Props> = ({ children }) => {
  return <View
  style={[styles.container, StyleSheet.absoluteFill]}
  > 
    
    {children}</View>;
};

// Define tus estilos aquí
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject, // Esto hará que el contenedor se posicione absolutamente
    justifyContent: 'center', // Centra los hijos verticalmente
    paddingHorizontal: 40, 
    paddingVertical: 40,
    //TODO: ask Khells and Ashley
    // Añade estilos adicionales si es necesario
  },
});

