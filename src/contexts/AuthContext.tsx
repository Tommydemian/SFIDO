import React, { createContext, useState, useEffect } from "react";
import { addUserToFirestore } from "../services/userService";
import { sendPasswordResetEmail } from "../services/authService";
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

type AuthProviderProps = {
    children: React.ReactNode
}

type User = {
    email: string;
    uid: string;
    isLoggedIn: boolean;
    loading: boolean;
}

type AuthContextType = {
    user: User
    setUser: React.Dispatch<React.SetStateAction<User>>
    handleSignup: (email: string, password: string) => void;
    signOutUser: () => void;
    handleForgotPassword: (email: string) => void  
    handleSignIn: (email: string, password: string) => void
    onGoogleButtonPress: () => Promise<FirebaseAuthTypes.UserCredential | undefined>
  }


export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider:React.FC<AuthProviderProps> = ({children}) => {
 // State
  const [user, setUser] = useState<User>({email:'', uid: '', isLoggedIn: false, loading: false})
  const [initializing, setInitializing] = useState(true);

  GoogleSignin.configure({
    webClientId: '86924702179-fkg4evrmr3rcu1om8np5gg898v73u5j6.apps.googleusercontent.com',
  });

  // function Sign up
const handleSignup = (email: string, password: string) => {
    setUser(current => ({...current, loading: true}))
    auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed up
      const newUser = {
        email: userCredential.user.email!,
        uid: userCredential.user.uid,
        insertedAt: firestore.Timestamp.now().toDate(),
        quoteIndex: 1,
        lastQuoteUpdate: new Date().toLocaleDateString()
      };
       return addUserToFirestore(newUser);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode);
      console.error(errorMessage);
      
      setUser(current => ({...current, loading: false}))
  })
}

// function sign in 
const handleSignIn = (email: string, password: string) => {
auth()
  .signInWithEmailAndPassword(email, password)
  .then(() => {
    console.log('Signed in succesfully!');
  })
  .catch(error => {
    console.error(error);
  });
}

// function Sign in with Google
const onGoogleButtonPress = async () => {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const response = await GoogleSignin.signIn();
    console.log('Google Sign-In response:', response);

    if (response && response.idToken) {
      const googleCredential = auth.GoogleAuthProvider.credential(response.idToken);
      return auth().signInWithCredential(googleCredential);
    } else {
      console.log('No idToken received');
    }
  } catch (error) {
    console.error('Google Sign-In Error: ', error);
  }
};


 // function Signout 
 function signOutUser() {
  auth().signOut()
    .then(() => {
      setUser(current => ({...current, isLoggedIn: false, email: '', uid: ''}));
    })
    .catch((error) => {
      console.error(error);
    });
}

// function Recover password
const handleForgotPassword = (email: string) => {
  setUser(current => ({...current, loading: true}));
  sendPasswordResetEmail(email)
    .then(() => {
      alert('Reset Password email sent successfully');
    })
    .catch((error) => {
      console.error(error.code);
      console.error(error.message);
    })
    .finally(() => {
      setUser(current => ({...current, loading: false}));
    });
};

   useEffect(() => {
  const subscriber = auth().onAuthStateChanged((firebaseUser) => {
    console.log(firebaseUser?.email);
    if (firebaseUser) {
      // Usuario está autenticado
      setUser(current => ({
        ...current, 
        isLoggedIn: true, 
        email: firebaseUser.email || '', 
        loading: false, 
        uid: firebaseUser.uid
      }));
    } else {
      // Usuario no está autenticado
      setUser(current => ({
        ...current, 
        isLoggedIn: false, 
        email: '', 
        loading: false, 
        uid: ''
      }));
    }
  });

  return () => subscriber();
}, []);


 return(<AuthContext.Provider value={{user, setUser, handleSignup, signOutUser, handleForgotPassword, handleSignIn, onGoogleButtonPress}}>
        {children}
    </AuthContext.Provider>)
}