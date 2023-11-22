import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, {useState} from 'react'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import { MainStackParams } from '../navigation/MainStackNavigator'
import { Message } from '../types'
import { SubmitButton } from '../components/SubmitButton'

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

type Props = NativeStackScreenProps<MainStackParams, 'MessageScreen'>

export const MessageScreen: React.FC<Props> = ({route}) => {

    const {email, id} = route.params

    const [message, setMessage] = useState<Partial<Message>>({})

    const handleSendMessage =  () => {
      firestore().collection('messages').add({...message, senderID: auth().currentUser?.uid, receiverID: id, timeStamp: firestore.Timestamp.now().toDate()})
      .then(() => {
        setMessage({messageText: ''})
      }).catch((error) => {
        console.error(error);
      })
    }

  return (
    <SafeAreaView style={styles.container}>

     <Text>Send message to: <Text style={{fontWeight: 'bold'}}>{email}</Text></Text>

      <TextInput 
      style={styles.messageInput}
      value={message.messageText}
      onChangeText={(text) => setMessage({ ...message, messageText: text})}
      placeholder="Write your message here..."
      multiline 
      /> 

      <SubmitButton onPress={handleSendMessage}>Send Message</SubmitButton>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    messageInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        width: '80%'
    }
})