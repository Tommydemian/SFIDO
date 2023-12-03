import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, SafeAreaView, ScrollView, FlatList } from 'react-native';
import auth from '@react-native-firebase/auth';

import {NativeStackScreenProps} from '@react-navigation/native-stack'
import { MainStackParams } from '../navigation/MainStackNavigator';
import { getCategoriesFromFirestore } from '../services/categoriesService';
import { Categorie } from '../types';
import { COLORS } from '../../assets/theme';

import { InterestCard } from '../components/InterestCard';
import { useSelectInterests } from '../hooks/useSelectInterests';
import { useAuthContext } from '../hooks/useAuthContext';
import { addIntererstsToFirestoreUser } from '../services/userService';
import Spinner from 'react-native-loading-spinner-overlay';

type Props = NativeStackScreenProps<MainStackParams, 'CategoriesSelectionScreen'>

const windowHeight = Dimensions.get('window').height;

export const CategoriesSelectionScreen : React.FC<Props> = ({navigation}) => {
  const [interests, setInterests] = useState<Categorie[]>([])
  const [loading, setLoading] = useState(false)

  const {signOutUser} = useAuthContext()

  useEffect(() => {
    setLoading(true)
    getCategoriesFromFirestore()
    .then((res) => {
      const interestsList = res.docs.map(doc => doc.data() as Categorie)
      setInterests(interestsList)
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => setLoading(false))
  }, [])

  const {handleSelect, selectedInterests} = useSelectInterests()

  const handleSubmitResult = () => {
    if (selectedInterests.length > 0) {
      addIntererstsToFirestoreUser(auth().currentUser?.uid!, selectedInterests)
      .then(() => {
        navigation.navigate('BottomTabs')
      }).catch((err) => {
        console.log(err);
      })
    }
  }

  
  // loading return
  if (loading) {
    return <Spinner />;
  }
  

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>What Type of Beast Are You?</Text>
      <View style={styles.interestsContainer}>
        <TouchableOpacity onPress={signOutUser}><Text>Sign out</Text></TouchableOpacity>
    {
      interests.length > 0 && (
        <FlatList
      data={interests}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
      <InterestCard 
      onPress={() => handleSelect(item.id)}
      key={item.id}
      description={item.description} 
      title={item.title}
      isSelected={selectedInterests.includes(item.id)} 
        />
        )}
      style={styles.flatList}
        />
      )
    }

      </View>      
      <TouchableOpacity
       style={styles.ctaButton}
       disabled={selectedInterests.length !== 3}
       onPress={handleSubmitResult}
       >
            <Text style={styles.ctaButtonText}>Confirm</Text>
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
    marginBottom: 100, 
    backgroundColor: COLORS.orangeWeb
  },
  confirmButtonText: {
    // Estilos para el texto del botón de confirmación
  },
  flatList: {
    height: windowHeight * 0.7, 
    marginBottom: 10
  }, 
  ctaButton: {
    backgroundColor: COLORS.orangeWeb,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
},
ctaButtonText: {
    color: COLORS.whiteText,
    fontWeight: 'bold',
    fontSize: 18,
},
});

