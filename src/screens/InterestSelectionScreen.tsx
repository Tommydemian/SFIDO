import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack'
import { MainStackParams } from '../navigation/MainStackNavigator';
import { getInterestsFromFirestore } from '../services/interestsService';
import { Interest } from '../types';
import { COLORS } from '../../assets/theme';

import { InterestCard } from '../components/InterestCard';
import { useSelectInterests } from '../hooks/useSelectInterests';

type Props = NativeStackScreenProps<MainStackParams, 'InterestSelectionScreen'>

export const InterestSelectionScreen: React.FC<Props> = ({navigation}) => {
  const [interests, setInterests] = useState<Interest[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getInterestsFromFirestore()
    .then((res) => {
      const interestsList = res.docs.map(doc => doc.data() as Interest)
      setInterests(interestsList)
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => setLoading(false))
  }, [])

  const {handleSelect, selectedInterests} = useSelectInterests()

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>What Type of Beast Are You?</Text>
      <View style={styles.interestsContainer}>
      <ScrollView style={{width: '100%'}}>
        {interests.map(interest => (
          <InterestCard 
          onPress={() => handleSelect(interest.id)}
           key={interest.id}
            description={interest.description} 
            title={interest.title}
            isSelected={selectedInterests.includes(interest.id)} 
            />
          ))}
          </ScrollView>

      </View>
      <TouchableOpacity 
        style={styles.confirmButton} 
        disabled={selectedInterests.length !== 3}
        onPress={() => {/* lógica para guardar las selecciones y navegar a la siguiente pantalla */}}
      >
        <Text style={styles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.blackBg
    // Estilos adicionales
  },
  interestTitle: {}, 
  interestDescription: {},
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

