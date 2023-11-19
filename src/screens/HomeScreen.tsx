import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { auth, firestore } from '../config/firebaseConfig'
import { useAuthContext } from '../hooks/useAuthContext'
import { signOut } from 'firebase/auth'
import { SubmitButton } from '../components/SubmitButton'
import { User } from '../types'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import { MainStackParams } from '../navigation/MainStackNavigator'

// const messagesCol = collection(firestore, 'messages')
// const messagesQuery = query(messagesCol, where('receiverId', '==', auth.currentUser?.uid ) )

const usersCol = collection(firestore, 'users')

type Props = NativeStackScreenProps<MainStackParams, 'HomeScreen'>


export const HomeScreen: React.FC<Props> = ({ navigation }) => {

    const [users, setUsers] = useState<User[]>([])

    const {user} = useAuthContext()
    useEffect(() => {
    const unsuscribe = onSnapshot(usersCol, snapshot => {
        console.log(snapshot.docs.map(doc => doc.data()))
        const usersData = snapshot.docs.map(doc => doc.data() as User)
        setUsers(usersData)
    })

    return () => unsuscribe()
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

      <SubmitButton onPress={() => signOut(auth)}>Sign out</SubmitButton>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20
    }
})