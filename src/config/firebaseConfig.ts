// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtbTzy4xTytFr-b4Q4JAjy6OlZgw7ixyU",
  authDomain: "realtimeme-4afc1.firebaseapp.com",
  projectId: "realtimeme-4afc1",
  storageBucket: "realtimeme-4afc1.appspot.com",
  messagingSenderId: "86924702179",
  appId: "1:86924702179:web:088b0958b926035d6430d6"
};

// Initialize Firebase
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app)
export const storage = getStorage(app)
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});