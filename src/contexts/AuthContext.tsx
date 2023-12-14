import React, { createContext, useState, useEffect, useContext } from "react";

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { GoogleContext } from "./GoogleContext";

// services
import { addUserToFirestore} from "../services/userService";
import * as authService from '../services/authService';

// types
import { DbUser } from "../types";
import { UseFormReset } from "react-hook-form";

type AuthProviderProps = {
    children: React.ReactNode
}

type User = {
    email: string;
    uid: string;
    isLoggedIn: boolean;
    loading: boolean;
    profilePic?: string;
}

type ResetFunction = UseFormReset<FormData>;

type AuthContextType = {
    user: User
    setUser: React.Dispatch<React.SetStateAction<User>>
    handleSignUp: (email: string, password: string, reset: ResetFunction) => void;
    signOutUser: () => void;
    handleForgotPassword: (email: string) => void  
    handleSignIn: (email: string, password: string, reset: ResetFunction) => void
    errorMessageState: string
    setErrorMessageState: React.Dispatch<React.SetStateAction<string>>
  }


export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider:React.FC<AuthProviderProps> = ({children}) => {
 // State
  const [user, setUser] = useState<User>({email:'', uid: '', isLoggedIn: false, loading: false})
  const [errorMessageState, setErrorMessageState] = useState('')


  const googleContext = useContext(GoogleContext)

    if (!googleContext) {
        throw new Error('useContext must be used within a GoogleProvider')
    }

    const {isLinking} = googleContext


// function Sign up
const handleSignUp = async (email: string, password: string, reset: ResetFunction) => {
  setUser(current => ({...current, loading: true}))
  try {
    const userCredential = await authService.signUpWithEmail(email, password)
    if (userCredential instanceof Object && userCredential.user) {
      
      // Signed up
      const newUser: DbUser = {
        email: userCredential.user.email!,
        uid: userCredential.user.uid,
        insertedAt: firestore.Timestamp.now().toDate(),
        quoteIndex: 1,
        lastQuoteUpdate: new Date().toLocaleDateString(), 
        profilePic: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D',
        isGoogleAccountLinked: false
      };
      return addUserToFirestore(userCredential.user.uid, newUser)
      .then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      }); // TODO: handle better
    }
  } catch (error) {
    const err = error as  Error
    setErrorMessageState(err.message)
    console.error(err.message);
  } finally {
      setUser(current => ({...current, loading: false}));
      reset();
    }
  }
    

// function sign in 
const handleSignIn = async (email: string, password: string, reset: ResetFunction) => {
setUser(current => ({...current, loading: true}));
try {
  const userCredential = await authService.signInWithEmail(email, password) 
  console.log(userCredential, 'MOBB DEEP');
} catch (error) {
  const err = error as  Error
    setErrorMessageState(err.message)
    console.error(err.message);
} finally {
  setUser(current => ({...current, loading: false}));
  reset();
}
}

 // function Signout 
 function signOutUser() {
  setUser(current => ({...current, loading: true}))
  try {
    authService.signOut()   
  } catch (error) {
    const err = error as Error;
    console.error(err.message);
    setErrorMessageState(err.message)
  } finally {
    setUser(current => ({...current, loading: true}))
  }
}

// function Recover password
const handleForgotPassword = async (email: string) => {
  setUser(current => ({...current, loading: true}));
  try {
    await authService.sendPasswordResetEmail(email);
    alert('Reset Password email sent successfully');
  } catch (error) {
    const err = error as Error
    console.error(err.message);
    // Actualizar el estado con el mensaje de error
    setErrorMessageState(err.message);
  } finally {
    setUser(current => ({...current, loading: false}));
  }
};


  useEffect(() => {
  const subscriber = auth().onAuthStateChanged((firebaseUser) => {
    console.log(firebaseUser?.email);
    if (firebaseUser && !isLinking) {
      // Authenticated user
      setUser(current => ({
        ...current, 
        isLoggedIn: true, 
        email: firebaseUser.email || '', 
        loading: false, 
        uid: firebaseUser.uid
      }));
    } else {
      // Unauthenticated user
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


 return(<AuthContext.Provider value={{user, setUser, errorMessageState, handleSignUp, setErrorMessageState, signOutUser, handleForgotPassword, handleSignIn}}>
        {children}
    </AuthContext.Provider>)
}