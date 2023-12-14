import { createContext, useState, useContext } from "react";

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// types
import { DbUser } from "../types";

// services:
import { checkIfUserExistsInFirestore, addUserToFirestore } from "../services/userService";
import { isGoogleAccountLinked } from "../services/googleService";

type GoogleProviderProps = {
    children: React.ReactNode
}

type GoogleContextType = {
    onGoogleButtonPress: () => Promise<FirebaseAuthTypes.UserCredential | undefined>
    linkGoogleAccount: (googleCredential: FirebaseAuthTypes.AuthCredential, email: string, password: string) => Promise<void>
    isGoogleLinked: boolean
    isLinking: boolean
  }

export const GoogleContext = createContext<GoogleContextType| undefined>(undefined)

export const GoogleProvider:React.FC<GoogleProviderProps> = ({children}) => {
  //const [initializing, setInitializing] = useState(true);
  const [isLinking, setIsLinking] = useState(false)
  const [isGoogleLinked, setIsGoogleLinked] = useState(false)

const linkGoogleAccount = async (googleCredential: FirebaseAuthTypes.AuthCredential, email: string, password: string) => {
    // Asumiendo que 'User' es el tipo de tu usuario y tiene un campo 'uid'
    setIsLinking(true);
    try {
      const currentUser = await auth().signInWithEmailAndPassword(email, password);
      if (currentUser) {
        await currentUser.user.linkWithCredential(googleCredential);
        console.log('Cuenta de Google vinculada con éxito');
      } else {
        console.error('No se pudo iniciar sesión con la cuenta existente');
      }
    } catch (error) {
      console.error('Error al vincular la cuenta de Google: ', error);
    } finally {
      setIsLinking(false);
    }
  };
  
  // Function to handle sign-in with Google
  const onGoogleButtonPress = async () => {
    try {
      // Check if Google Play Services are available for Google Sign-In
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      // Attempt to sign in with Google
      const response = await GoogleSignin.signIn();
      console.log('Google Sign-In response:', response);
  
      // Create a new user object based on the Google response
      const newUser: DbUser = {
        email: response.user.email,
        uid: response.user.id,
        insertedAt: firestore.Timestamp.now().toDate(),
        quoteIndex: 1,
        lastQuoteUpdate: new Date().toLocaleDateString(),
        profilePic: response.user.photo || '',
        isGoogleAccountLinked: false
      };
  
      // Check if the response includes an ID token
      if (response && response.idToken) {
        // Create a credential for Firebase authentication using the Google ID token
        const googleCredential = auth.GoogleAuthProvider.credential(response.idToken);
  
        // Check if the user's Google account is already linked
        isGoogleAccountLinked(response.user.email)
          //isLinked: boolean
          .then((isLinked) => {
            console.log('isLinked in then:', isLinked);
            setIsGoogleLinked(isLinked!);
  
            // Sign in to Firebase with the Google credential
            return auth().signInWithCredential(googleCredential);
          }).catch((err) => {
            console.log('Error in isUserGoogleAccountLinked:', err);
          });
  
        // Log for debugging
        console.log('After isUserGoogleAccountLinked call');
  
        // Check if the user already exists in Firestore
        const existingUser = await checkIfUserExistsInFirestore(response.user.email);
  
        // If the user exists, return their email and Google credential
        // Otherwise, add the new user to Firestore and sign in
        if (existingUser) {
          return { email: response.user.email, googleCredential: googleCredential };
        } else {
          addUserToFirestore(response.user.id, newUser)
            .then(() => {
              return auth().signInWithCredential(googleCredential);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } else {
        console.log('No idToken received');
      }
    } catch (error) {
      console.error('Google Sign-In Error: ', error);
    }
  };
  

return(<GoogleContext.Provider value={{isGoogleLinked, linkGoogleAccount, onGoogleButtonPress, isLinking}}>
    {children}
</GoogleContext.Provider>)
}

export const useGoogleContext = () => {
    const context = useContext(GoogleContext);
    if (!context) {
        throw new Error('useAuthContext must be used within a AuthProvider');
    }
    return context;
  };