import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {OnBoardingContainer} from '../components/OnBoardingContainer'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AbsoluteFillBgImage } from '../components/AbsoluteFillBgImage'
import { YungJakesText } from '../components/YungJakesText'
import { TouchableOpacity } from 'react-native'
import { useAuthContext } from '../hooks/useAuthContext'

export const DemoSettedScren = () => {

  const {signOutUser} = useAuthContext()

  return (
    <SafeAreaView style={styles.container}>
      <OnBoardingContainer>
        <AbsoluteFillBgImage />
          <YungJakesText customStyles={styles.quoteBody}>Whtever</YungJakesText>
          <TouchableOpacity onPress={signOutUser}><Text>Sign out</Text></TouchableOpacity>
      </OnBoardingContainer>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }, 
  quoteBody: {
    fontSize: 26
  }
})