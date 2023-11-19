import { FieldValue, Timestamp } from "firebase/firestore";

export type Message = {
    senderID: string; 
    receiverID: string;
    messageText: string;
    timeStamp: Timestamp | FieldValue;
}

export type MessageUI = {
    senderID: string; 
    receiverID: string;
    messageText: string;
    timeStamp: string;
}


export type User = {
    email: string;
    insertedAt: Timestamp;
    uid: string;
}