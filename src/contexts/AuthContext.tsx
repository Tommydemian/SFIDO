import React, { createContext, useState, useEffect, useContext } from "react";
import { Alert } from "react-native";

import auth from '@react-native-firebase/auth';
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
    handleSignup: (email: string, password: string, navigation?:any, destination?: string) => void;
    signOutUser: () => void;
    handleForgotPassword: () => void  
  }

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider:React.FC<AuthProviderProps> = ({children}) => {
 // State
  const [user, setUser] = useState<User>({email:'', uid: '', isLoggedIn: false, loading: false})


  // function Sign up
const handleSignup = (email: string, password: string) => {
    setUser(current => ({...current, loading: true}))
    auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential):void => {
      // Signed up
      console.log(userCredential, 'user from then');

      firestore().collection('users').add({email: userCredential.user.email, uid: userCredential.user.uid, insertedAt: firestore.Timestamp.now().toDate()}).then(() => {
        console.log('USER ADDED');
        
      }).catch((err) => {
        console.log(err);
      })

      // if (navigation) {
      //   navigation.navigate(destination)
      // }

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
  auth().signOut()
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
          auth().sendPasswordResetEmail(emailInput!)
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
  const subscriber = auth().onAuthStateChanged((firebaseUser) => {
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


 return(<AuthContext.Provider value={{user, setUser, handleSignup, signOutUser, handleForgotPassword}}>
        {children}
    </AuthContext.Provider>)
}