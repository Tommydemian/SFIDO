import React, { createContext, useState, useEffect } from "react";
import { addUserToFirestore, checkIfUserExistsInFirestore, isUserGoogleAccountLinked } from "../services/userService";
import { sendPasswordResetEmail } from "../services/authService";
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { DbUser } from "../types";
import { useForm, UseFormReset } from "react-hook-form";

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
    handleSignup: (email: string, password: string) => void;
    signOutUser: () => void;
    handleForgotPassword: (email: string) => void  
    handleSignIn: (email: string, password: string) => void
    onGoogleButtonPress: () => Promise<FirebaseAuthTypes.UserCredential | undefined>
    linkGoogleAccount: (googleCredential: FirebaseAuthTypes.AuthCredential, email: string, password: string) => Promise<void>
    isGoogleLinked: boolean
    errorMessageState: string
    setErrorMessageState: React.Dispatch<React.SetStateAction<string>>
  }


export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider:React.FC<AuthProviderProps> = ({children}) => {
 // State
  const [user, setUser] = useState<User>({email:'', uid: '', isLoggedIn: false, loading: false})
  const [errorMessageState, setErrorMessageState] = useState('')
  const [initializing, setInitializing] = useState(true);
  const [isLinking, setIsLinking] = useState(false)
  const [isGoogleLinked, setIsGoogleLinked] = useState(false)

  GoogleSignin.configure({
    webClientId: '86924702179-fkg4evrmr3rcu1om8np5gg898v73u5j6.apps.googleusercontent.com',
  });

// function Sign up
const handleSignup = (email: string, password: string, reset: ResetFunction) => {
    setUser(current => ({...current, loading: true}))
    auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
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
       return addUserToFirestore(userCredential.user.uid, newUser);
    })
    .catch((error) => {
      let errorMessage = '';
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'That email address is already in use!';
          break;
        case 'auth/invalid-email':
          errorMessage = 'That email address is invalid!';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Email and password accounts are not enabled.';
          break;
        case 'auth/weak-password':
          errorMessage = 'The password is too weak.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error, please try again.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many requests, please try again later.';
          break;
        case 'auth/internal-error':
          errorMessage = 'An unexpected error occurred, please try again.';
          break;
        default:
          errorMessage = 'An unknown error occurred.';
      }
      console.error(errorMessage);
      setErrorMessageState(errorMessage);
    }).finally(() => {
      setUser(current => ({...current, loading: false}));
      reset();
    })
}

// function sign in 
const handleSignIn = (email: string, password: string, reset: ResetFunction) => {

setUser(current => ({...current, loading: true}));

auth()
  .signInWithEmailAndPassword(email, password)
  .then(() => {
    console.log('Signed in succesfully!');
  })
  .catch((error) => {
    let errorMessage = '';
    switch (error.code) {
      case 'auth/invalid-email':
        errorMessage = 'The email address is invalid.';
        break;
      case 'auth/user-disabled':
        errorMessage = 'This user account has been disabled.';
        break;
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        errorMessage = 'Incorrect email or password.';
        break;
      case 'auth/too-many-requests':
        errorMessage = 'Too many attempts. Please try again later.';
        break;
      default:
        errorMessage = 'Login failed. Please try again.';
    }
    console.error(error);
    console.log(error);
    
    // console.error(errorMessage);
    setErrorMessageState(errorMessage);
  })
  .finally(() => {
    setUser(current => ({...current, loading: false}));
    reset();
  });
}

const linkGoogleAccount = async (googleCredential: FirebaseAuthTypes.AuthCredential, email: string, password: string) => {
  // Asumiendo que 'User' es el tipo de tu usuario y tiene un campo 'uid'
  setIsLinking(true)
  try {
    const currentUser = await auth().signInWithEmailAndPassword(email, password);
    if (currentUser) {
      await currentUser.user.linkWithCredential(googleCredential);
      console.log('Cuenta de Google vinculada con éxito');
      setIsLinking(true)
    } else {
      console.log('No se pudo iniciar sesión con la cuenta existente');
    }
  } catch (error) {
    console.error('Error al vincular la cuenta de Google: ', error);
    setIsLinking(true)
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
      isUserGoogleAccountLinked(response.user.email)
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


 return(<AuthContext.Provider value={{user, setUser, errorMessageState, handleSignup, setErrorMessageState, signOutUser, handleForgotPassword, handleSignIn, onGoogleButtonPress, linkGoogleAccount, isGoogleLinked}}>
        {children}
    </AuthContext.Provider>)
}