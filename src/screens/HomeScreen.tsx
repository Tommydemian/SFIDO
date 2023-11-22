import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuthContext } from '../hooks/useAuthContext'
import { SubmitButton } from '../components/SubmitButton'
import { User } from '../types'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import { MainStackParams } from '../navigation/MainStackNavigator'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

type Props = NativeStackScreenProps<MainStackParams, 'HomeScreen'>

export const HomeScreen: React.FC<Props> = ({ navigation }) => {

    const [users, setUsers] = useState<User[]>([])

    const {user, signOutUser} = useAuthContext()

    useEffect(() => {
    const subscriber = 
    firestore()
    .collection('users')
    .onSnapshot(collectionSnapshot => {
        const usersData = collectionSnapshot.docs.map(doc => doc.data() as User)
        setUsers(usersData)
    })

    return () => subscriber()
    }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Text>HomeScreen</Text>

      {
        users.map(user => (
            <TouchableOpacity key={user.uid} onPress={() => navigation.navigate('MessageScreen', {id: user.uid, email: user.email} )}>
            <Text>{user.email}</Text>
        </TouchableOpacity>
        ))
      }

      <SubmitButton onPress={signOutUser}>Sign out</SubmitButton>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20
    }
})