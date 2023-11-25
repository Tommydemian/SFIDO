import { createContext, useState } from "react";

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Message } from "../types";

import { addMessageToFirestore } from "../services/messageService";

type ProviderProps = {
  children: React.ReactNode
}

type MessageContextType = {
  message: Message;
  setMessage: React.Dispatch<React.SetStateAction<Message>>
  handleSentAndReceivedMessages: (id: string) => {sentMessagesSubscriber: () => void, receivedMessagesSubscriber: () => void}
  handleSendMessage: (id: string) => void
  receivedMessages: Message[]
  sentMessages: Message[];
}

export const MessageContext = createContext<MessageContextType | undefined>(undefined)

export const MessageProvider: React.FC<ProviderProps> = ({children}) => {
    const [message, setMessage] = useState<Message>({
        messageText: '', 
        receiverID: '', 
        senderID: '', 
        timeStamp: firestore.Timestamp.now().toDate()
    })
    const [receivedMessages, setReceivedMessages] = useState<Message[]>([])
    const [sentMessages, setSentMessages] = useState<Message[]>([])

     // handle Send Message, create document
     const handleSendMessage =  (id: string) => {
        // clause guard => no text => no message possible sent
        if (!message.messageText) return;

        addMessageToFirestore({
          ...message,
           senderID: auth().currentUser?.uid || '',
          receiverID: id,
          timeStamp: firestore.Timestamp.now().toDate()
        })
          .then(() => {
          setMessage({...message, messageText: ''})
        }).catch((error) => {
          console.error(error);
        })
      }
  
        function handleSentAndReceivedMessages(id: string) {
            // START
        const currentUserId = auth().currentUser?.uid;
        if (!currentUserId) return;
      
          // Query para mensajes enviados
          const sentMessagesQuery = firestore()
          .collection('messages')
          .where('senderID', '==', currentUserId)
          .where('receiverID', '==', id);
  
          // Query para mensajes recibidos
          const receivedMessagesQuery = firestore()
          .collection('messages')
          .where('receiverID', '==', currentUserId)
          .where('senderID', '==', id); 
      
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
        return {
            sentMessagesSubscriber, 
            receivedMessagesSubscriber
        }
      }
  

    return (
        <MessageContext.Provider value={{message, setMessage, sentMessages, receivedMessages, handleSendMessage, handleSentAndReceivedMessages}}>
            {children}
        </MessageContext.Provider>
    )
}

