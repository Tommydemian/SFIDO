import { Timestamp } from "firebase/firestore";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

export type Message = {
  senderID: string;
  receiverID: string;
  messageText: string;
  timeStamp: Date;
};

export type MessageUI = {
  senderID: string;
  receiverID: string;
  messageText: string;
  timeStamp: string;
};

export type User = {
  email: string;
  insertedAt: Timestamp;
  uid: string;
};

export type DbUser = {
  email: string;
  uid: string;
  insertedAt: Date;
  quoteIndex: number;
  lastQuoteUpdate: string;
  profilePic?: string;
  isGoogleAccountLinked: boolean;
};

export type Quote = {
  text: string;
  author: string;
  id: number;
  category_id: number;
};

export type Categorie = {
  title: string;
  description: string;
  id: number;
};

export type DraftUserCredentials = FirebaseAuthTypes.UserCredential & {
  email: string;
  googleCredential: FirebaseAuthTypes.AuthCredential;
};

export type FormData = {
  email: string;
  password: string;
};

// BottomSheet logic
export type ActiveBottomSheet = {
  activeOne: "colorPicker" | "inspiration";
};

// DemoSection Image FlatList
export type ImageItem = {
  id: number;
  uri: string;
};

export type CarouselItem = ImageItem;

// User Profile data
export type UserProfileData = {
  id: number;
  title: string;
  icon: string;
};

export type MotivationalMessage = {};
