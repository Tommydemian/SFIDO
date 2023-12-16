import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import {OnBoardingContainer} from '../components/OnBoarding/OnBoardingContainer'
import { AbsoluteFillBgImage } from '../components/AbsoluteFillBgImage'
import { YungJakesText } from '../components/YungJakesText'
import { TouchableOpacity } from 'react-native'
import { useAuthContext } from '../contexts/AuthContext'
import {S3Image} from '../components/S3Image'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { MainStackParams } from '../navigation/MainStackNavigator'
import { COLORS } from '../../assets/theme'
import { Ionicons } from '@expo/vector-icons';

const bgimage = require('../../assets/images/city.jpg')

type NavigationProps = NativeStackScreenProps<MainStackParams, 'DemoSettedScreen'>

export const DemoSettedScren: React.FC<NavigationProps> = ({route, navigation}) => {

const {image, text} = route.params

  const {signOutUser} = useAuthContext()

  return (
    <View style={styles.container}>
        <S3Image imgKey='doberman.jpeg' style={styles.backgroundImage}/>
        <Image source={{uri: image}} style={styles.backgroundImage} /> 
        <AbsoluteFillBgImage imageKey='demobg' />
      <OnBoardingContainer>
        <View style={styles.quoteBodyContainer}>
          <YungJakesText customStyles={styles.quoteBody}>{text}</YungJakesText>
        </View>
          <TouchableOpacity onPress={signOutUser}><Text>Sign out</Text></TouchableOpacity>
          <Ionicons onPress={() => navigation.goBack()} name="arrow-back-circle" size={24} color={COLORS.black} />
      </OnBoardingContainer>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red'
  },
  quoteBody: {
    fontSize: 40, 
    justifyContent: 'center',
    color: COLORS.blackSecondaryText
  }, 
  quoteBodyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }, 
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    width: '100%',
    height: '100%', // Ajustar según necesidad
  },
})