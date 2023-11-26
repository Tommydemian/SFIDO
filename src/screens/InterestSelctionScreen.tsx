import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack'
import { MainStackParams } from '../navigation/MainStackNavigator';

type Props = NativeStackScreenProps<MainStackParams, 'InterestSelectionScreen'>

export const InterestSelectionScreen: React.FC<Props> = ({navigation}) => {
  const [selectedInterests, setSelectedInterests] = useState([]);

  const handleSelectInterest = (interestId) => {
    if (selectedInterests.includes(interestId)) {
      setSelectedInterests(selectedInterests.filter(id => id !== interestId));
    } else if (selectedInterests.length < 3) {
      setSelectedInterests([...selectedInterests, interestId]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What Type of Beast Are You?</Text>
      <View style={styles.interestsContainer}>
        {interests.map(interest => (
          <TouchableOpacity
            key={interest.id}
            style={[
              styles.interestCard,
              selectedInterests.includes(interest.id) && styles.selectedInterest
            ]}
            onPress={() => handleSelectInterest(interest.id)}
          >
            <Text style={styles.interestTitle}>{interest.title}</Text>
            <Text style={styles.interestDescription}>{interest.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity 
        style={styles.confirmButton} 
        disabled={selectedInterests.length !== 3}
        onPress={() => {/* lógica para guardar las selecciones y navegar a la siguiente pantalla */}}
      >
        <Text style={styles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // Estilos adicionales
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    // Estilos adicionales
  },
  interestsContainer: {
    // Estilos para el contenedor de intereses
  },
  interestCard: {
    // Estilos para las tarjetas de intereses
  },
  selectedInterest: {
    // Estilos para las tarjetas seleccionadas
  },
  confirmButton: {
    // Estilos para el botón de confirmación
  },
  confirmButtonText: {
    // Estilos para el texto del botón de confirmación
  },
});

