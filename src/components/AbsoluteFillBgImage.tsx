import { StyleSheet, View, Image } from 'react-native';
import React from 'react';
import { bgImages } from '../../assets/constants/data';

type Props = {
  imageKey: keyof typeof bgImages; // Esto asegura que sólo se puedan usar claves válidas
};

export const AbsoluteFillBgImage: React.FC<Props> = ({ imageKey }) => {
  const image = bgImages[imageKey]; // Accede a la imagen usando la clave

  return (
    <View style={StyleSheet.absoluteFill}>
      <Image source={image} style={{zIndex: 1}} />
    </View>
  );
};

