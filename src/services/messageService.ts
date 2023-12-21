import firestore from "@react-native-firebase/firestore";
import { Message } from "../types";

export const addMessageToFirestore = (message: Message) => {
  return firestore().collection("messages").add(message);
};
