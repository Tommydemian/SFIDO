import { Auth, createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signOut } from "firebase/auth";
import React, { createContext, useState, useEffect, useContext } from "react";
import { auth, firestore } from "../config/firebaseConfig";
import { Alert } from "react-native";
import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";

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
    handleSignup: (email: string, password: string, navigation?:any, destination?: string) => void;
    signOutUser: () => void;
    handleForgotPassword: () => void  
  }

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider:React.FC<AuthProviderProps> = ({children}) => {
 // State
  const [user, setUser] = useState<User>({email:'', uid: '', isLoggedIn: false, loading: false})

  // collection ref
  const usersCol = collection(firestore, 'users')


  // function Sign in
const handleSignup = (email: string, password: string, navigation?: any, destination?: string) => {
    setUser(current => ({...current, loading: true}))
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential):void => {
      // Signed up
      console.log(userCredential, 'user from then');
      // add user to DB
      // addDoc(usersCol, {email: userCredential.user.email, uid: userCredential.user.uid})
      const newDoc = doc(firestore, 'users', userCredential.user.uid);
      setDoc(newDoc, {email: userCredential.user.email, uid: userCredential.user.uid, insertedAt: serverTimestamp()})

      if (navigation) {
        navigation.navigate(destination)
      }

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode);
      console.error(errorMessage);
      
      // ..
      setUser(current => ({...current, loading: false}))
  })
 }

 // function Signout 
 function signOutUser() {
  signOut(auth)
    .then(() => {
      setUser(current => ({...current, isLoggedIn: false, email: '', uid: ''}));
    })
    .catch((error) => {
      console.error(error);
    });
}

// function Recover password
   const handleForgotPassword = () => {
    Alert.prompt('Forgot Password?', 'Enter your email address', 
    [
      {
        text: 'Cancel', 
        style: 'cancel'
      }, 
      {
        text: 'Reset Password', 
        onPress: ((emailInput) => {
          setUser(current => ({...current, isLoading: true}))
          sendPasswordResetEmail(auth, emailInput!)
          .then(() => {
            alert('Reset Password email sent successfully')
          }).catch((error) => {
            console.log();
            console.error(error.code);
            console.error(error.message);
          }).finally(() => {
            setUser(current => ({...current, isLoading: false}))
          })
        })
      }
    ]
    )
    }

   useEffect(() => {
  const unsuscribe = onAuthStateChanged(auth, (firebaseUser) => {
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

  return () => unsuscribe();
}, []);


 return(<AuthContext.Provider value={{user, setUser, handleSignup, signOutUser, handleForgotPassword}}>
        {children}
    </AuthContext.Provider>)
}