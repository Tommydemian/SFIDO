import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import { MainStackParams } from '../navigation/MainStackNavigator'
import { Message } from '../types'
import { SubmitButton } from '../components/SubmitButton'

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { COLORS } from '../theme'
import { format } from 'date-fns';

type Props = NativeStackScreenProps<MainStackParams, 'MessageScreen'>

export const MessageScreen: React.FC<Props> = ({route}) => {

  // get data from params
    const {email, id} = route.params

    // client side message state
    const [message, setMessage] = useState<Partial<Message>>({})
    const [receivedMessages, setReceivedMessages] = useState<Message[]>([])
    const [sentMessages, setSentMessages] = useState<Message[]>([])

    // handle Send Message, create document
    const handleSendMessage =  () => {
      // clause guard => no text => no message possible sent
      if (!message.messageText) return;

      firestore().collection('messages').add({...message, senderID: auth().currentUser?.uid, receiverID: id, timeStamp: firestore.Timestamp.now().toDate()})
      .then(() => {
        setMessage({messageText: ''})
      }).catch((error) => {
        console.error(error);
      })
    }

    // querying

    useEffect(() => {
      // Ensure currentUser exists and has a uid
      const currentUserId = auth().currentUser?.uid;
      if (!currentUserId) return;
    
        // Query para mensajes enviados
        const sentMessagesQuery = firestore()
        .collection('messages')
        .where('senderID', '==', currentUserId)
        .where('receiverID', '==', id); // Agrega esta línea

        // Query para mensajes recibidos
        const receivedMessagesQuery = firestore()
        .collection('messages')
        .where('receiverID', '==', currentUserId)
        .where('senderID', '==', id); // Agrega esta línea
    
      const sentMessagesSubscriber = sentMessagesQuery.onSnapshot((snapshot) => {
        // Process the snapshot data
        const messagesData = snapshot.docs.reverse().map(doc => doc.data() as Message);
        setSentMessages(messagesData)
      });
    
      const receivedMessagesSubscriber = receivedMessagesQuery.onSnapshot((snapshot) => {
        // Process the snapshot data
        const messagesData = snapshot.docs.reverse().map(doc => doc.data() as Message);
        setReceivedMessages(messagesData)
      });
    
      // Unsubscribe on cleanup
      return () => {
        sentMessagesSubscriber();
        receivedMessagesSubscriber();
      } ;
    }, []); // Empty dependency array or stable dependencies

    const formatMessageTime = (timestamp: any) => {
      // Asegúrate de que timestamp es un objeto Date
      const date = timestamp.toDate();
      // Formatea la fecha y la hora. Puedes cambiar el formato según tus preferencias.
      return format(date, 'PPP, p');
  };
    
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>

{
    receivedMessages && receivedMessages.map((message) => (
        <View key={message.timeStamp.toString()} style={[styles.messageBubble, styles.receivedMessage]}>
            <Text style={styles.messageText}>{message.messageText}</Text>
            <Text style={styles.messageTime}>{formatMessageTime(message.timeStamp)}</Text>
        </View>
    ))
}
{
    sentMessages && sentMessages.map((message) => (
        <View key={message.timeStamp.toString()} style={[styles.messageBubble, styles.sentMessage]}>
            <Text style={styles.messageText}>{message.messageText}</Text>
            <Text style={styles.messageTime}>{formatMessageTime(message.timeStamp)}</Text>
        </View>
    ))
}
</ScrollView>
      <View style={styles.sendMessageWrapper}>
      <TextInput 
      style={styles.messageInput}
      value={message.messageText}
      onChangeText={(text) => setMessage({ ...message, messageText: text})}
      placeholder="Write your message here..."
      multiline 
      /> 

      <SubmitButton customStyles={styles.submitButton} onPress={handleSendMessage}>Send Message</SubmitButton>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20
    },
    scrollView: {
      width: '100%',
    },
    messageBubble: {
      padding: 10,
      borderRadius: 10,
      marginVertical: 5,
      maxWidth: '80%', // Hace que los mensajes no sean demasiado anchos.
      alignSelf: 'flex-start', // Alinea por defecto los mensajes al inicio (para receivedMessages).
  },
  sentMessage: {
      backgroundColor: '#DCF8C6', // Un color claro para los mensajes enviados.
      alignSelf: 'flex-end', // Alinea los mensajes enviados al final.
      marginRight: 10, // Espacio a la derecha para distinguirlos del borde y de los mensajes recibidos.
  },
  receivedMessage: {
      backgroundColor: '#ECECEC', // Un color neutral para los mensajes recibidos.
      marginLeft: 10, // Espacio a la izquierda para distinguirlos del borde y de los mensajes enviados.
  },
  messageText: {
      color: 'black', // El color del texto, puede ser lo que quieras.
  },
    sendMessageWrapper: {
      flexDirection: 'row',
      width: '100%',
      marginTop: 'auto',
      alignItems: 'center', // Ensure children are aligned in the center vertically.
      paddingHorizontal: 10, // Add some padding to prevent children touching the screen edges.
    },
    messageInput: {
      borderWidth: 1,
      borderColor: COLORS.darkGray,
      borderRadius: 5,
      padding: 10,
      flex: 1, // Take up as much space as possible.
      marginRight: 10, // Add a margin right to prevent touching the button.
    }, 
    submitButton: {
      flexShrink: 1, // Allow the button to shrink if needed.
      // Rest of your styles.
    },
    messageTime: {
      fontSize: 10,
      color: 'grey',
      alignSelf: 'flex-end', // Alinea la hora a la derecha de la burbuja del mensaje
  },
})