import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import auth from '@react-native-firebase/auth';

import Animated, {useSharedValue, useAnimatedScrollHandler, useAnimatedStyle, interpolate} from 'react-native-reanimated';

import {NativeStackScreenProps} from '@react-navigation/native-stack'
import { MainStackParams } from '../navigation/MainStackNavigator';
import { COLORS } from '../../assets/theme';

import { InterestCard } from '../components/InterestCard';
import { useHandleCategories } from '../hooks/useHandleCategories';
import { addIntererstsToFirestoreUser } from '../services/userService';
import Spinner from 'react-native-loading-spinner-overlay';
import { AnimatedCategorieCard } from '../components/AnimatedCategorieCard';

type Props = NativeStackScreenProps<MainStackParams, 'CategoriesSelectionScreen'>

export const CategoriesSelectionScreen : React.FC<Props> = ({navigation}) => {
  
  const {handleSelect, selectedCategories, categories, loading  } = useHandleCategories()

  const handleSubmitResult = () => {
    if (selectedCategories.length > 0) {
      addIntererstsToFirestoreUser(auth().currentUser?.uid!, selectedCategories)
      .then(() => {
        navigation.navigate('BottomTabs')
      }).catch((err) => {
        console.log(err);
      })
    }
  }

  // const scrollY = useSharedValue(0);

  // const scrollHandler = useAnimatedScrollHandler({
  //   onScroll: (event) => {
  //     scrollY.value = event.contentOffset.y;
  //   },
  // });

  // loading return
  if (loading) {
    return <Spinner />;
  }
  
  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={styles.title}>What Type of Beast Are You?</Text> */}
      <View style={styles.categoriesContainer}>
    {
      categories.length > 0 && (
        <Animated.FlatList
      data={categories}
      keyExtractor={(item) => item.id.toString()}
      // onScroll={scrollHandler}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        padding: 20,
        paddingTop: StatusBar.currentHeight || 42,
        borderRadius: 30, 
        rowGap: 15,
      }}
      renderItem={({ item, index }) => {
        return (
          <>
            <InterestCard
              onPress={() => handleSelect(item.id)}
              description={item.description} 
              title={item.title}
              isSelected={selectedCategories.includes(item.id)} 
            />
            </>
        );
      }}
      
      style={styles.flatList}
        />
        
      )
      
    }

      </View> 
      <TouchableOpacity
       style={styles.ctaButton}
       disabled={selectedCategories.length !== 3}
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
    backgroundColor: COLORS.blackBg
    // Estilos adicionales
  },
  interestTitle: {}, 
  interestDescription: {},
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: COLORS.whiteText,
    marginTop: 10
    // Estilos adicionales
  },
  categoriesContainer: { 
    height: '90%'
  },
  interestCard: {
    // Estilos para las tarjetas de intereses
  },
  selectedInterest: {
    // Estilos para las tarjetas seleccionadas
  },
  confirmButton: {
    backgroundColor: COLORS.orangeWeb
  },
  confirmButtonText: {
    // Estilos para el texto del botón de confirmación
  },
  flatList: {
    marginBottom: 10
  }, 
  ctaButton: {
    backgroundColor: COLORS.orangeWeb,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30
},
ctaButtonText: {
    color: COLORS.whiteText,
    fontWeight: 'bold',
    fontSize: 18,
},
});

