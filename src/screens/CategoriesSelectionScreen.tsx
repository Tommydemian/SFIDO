import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Image} from 'react-native';
import auth from '@react-native-firebase/auth';

import Animated, {useSharedValue, useAnimatedScrollHandler, useAnimatedStyle, interpolate} from 'react-native-reanimated';
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import { MainStackParams } from '../navigation/MainStackNavigator';
import { COLORS } from '../../assets/theme';

import { CategorieCard } from '../components/CategorieCard';
import { useHandleCategories } from '../hooks/useHandleCategories';
import { addIntererstsToFirestoreUser } from '../services/userService';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContainer } from '../components/AuthContainer';
import { SubmitButton } from '../components/SubmitButton';
import { NunitoText } from '../components/NunitoText';
import {CategorieCardIcon} from '../components/CategorieCardIcon';
import {OnBoardingContainer} from '../components/OnBoardingContainer'

const authbg = require('../../assets/images/authbg.png');

type Props = NativeStackScreenProps<MainStackParams, 'CategoriesSelectionScreen'>

export const CategoriesSelectionScreen : React.FC<Props> = ({navigation}) => {
  
  const {handleSelect, selectedCategories, categories, loading, handleExpandedCards, expandedCards } = useHandleCategories()

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

  // loading return
  if (loading) {
    return <Spinner />;
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <OnBoardingContainer>
      <View style={StyleSheet.absoluteFill}>
        <Image source={authbg} style={{flex: 1}} />
        </View>

      <AuthContainer> 
      <NunitoText type='bold' customStyles={styles.title}>Pick Your Categories</NunitoText>
      <NunitoText>Choose 3 Categories for a Tailored Experience</NunitoText>
      <View style={styles.categoriesContainer}>
    {
      categories.length > 0 && (
        <Animated.FlatList
      data={categories}
      keyExtractor={(item) => item.id.toString()}
      // onScroll={scrollHandler}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingTop: StatusBar.currentHeight || 42,
        borderRadius: 30, 
        rowGap: 15,
      }}
      renderItem={({ item, index }) => {
        return (
          <>
            <CategorieCard
              onExpandPress={() => {
                handleExpandedCards(item)
              }}
              description={item.description} 
              title={item.title}
              isSelected={selectedCategories.includes(item.id)} 
              expanded={!!expandedCards?.includes(item.id)}
              onIconPress={() => handleSelect(item.id)}
            >
              <CategorieCardIcon title={item.title} /> 
            </CategorieCard>
            </>
        );
      }}
      
      style={styles.flatList}
        /> 
      )
    }

      </View> 
      <SubmitButton
       style={styles.ctaButton}
       disabled={selectedCategories.length !== 3}
       onPress={handleSubmitResult}
       >
            <NunitoText type='bold' customStyles={styles.ctaButtonText}>Confirm</NunitoText>
            </SubmitButton>     
            </AuthContainer>
            </OnBoardingContainer>
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
    marginTop: 10
    // Estilos adicionales
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.grayText,
    textAlign: 'center',
  },
  categoriesContainer: { 
    height: '90%'
  },
  flatList: {
    marginBottom: 10
  }, 
  ctaButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30
},
ctaButtonText: {
    textAlign: 'center'
},
});

