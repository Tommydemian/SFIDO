import React, { createContext, useState, useEffect, useContext } from "react";

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import { GoogleContext } from "./GoogleContext";

// services
import { addUserToFirestore } from "../services/userService";
import * as authService from "../services/authService";

// types
import { DbUser } from "../types";
import { UseFormReset } from "react-hook-form";

// AuthProviderProps defines the expected properties for the AuthProvider.
type AuthProviderProps = {
  children: React.ReactNode;
};

// User defines the structure of the user state in the context.
type User = {
  email: string;
  uid: string;
  isLoggedIn: boolean;
  loading: boolean;
  profilePic?: string;
};

type ResetFunction = UseFormReset<FormData>;

type AuthContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  handleSignUp: (email: string, password: string, reset: ResetFunction) => void;
  signOutUser: () => void;
  handleForgotPassword: (email: string) => Promise<unknown>;
  handleSignIn: (email: string, password: string, reset: ResetFunction) => void;
  errorMessageForgotPassword: string;
  setErrorMessageForgotPassword: React.Dispatch<React.SetStateAction<string>>;
  errorMessageSignIn: string;
  setErrorMessageSignIn: React.Dispatch<React.SetStateAction<string>>;
  errorMessageSignUp: string;
  setErrorMessageSignUp: React.Dispatch<React.SetStateAction<string>>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

// AuthProvider is the component that provides the authentication context to its children.
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // State to manage user information and error state.
  const [user, setUser] = useState<User>({
    email: "",
    uid: "",
    isLoggedIn: false,
    loading: false,
  });
  const [errorMessageSignIn, setErrorMessageSignIn] = useState("");
  const [errorMessageSignUp, setErrorMessageSignUp] = useState("");
  const [errorMessageSignOut, setErrorMessageSignOut] = useState("");
  const [errorMessageForgotPassword, setErrorMessageForgotPassword] =
    useState("");

  const googleContext = useContext(GoogleContext);

  if (!googleContext) {
    throw new Error("useContext must be used within a GoogleProvider");
  }
  const { isLinking } = googleContext;

  // handleSignUp manages the user registration process.
  const handleSignUp = async (
    email: string,
    password: string,
    reset: ResetFunction,
  ) => {
    setUser((current) => ({ ...current, loading: true }));
    try {
      const userCredential = await authService.signUpWithEmail(email, password);
      if (userCredential instanceof Object && userCredential.user) {
        // Signed up
        const newUser: DbUser = {
          email: userCredential.user.email!,
          uid: userCredential.user.uid,
          insertedAt: firestore.Timestamp.now().toDate(),
          quoteIndex: 1,
          lastQuoteUpdate: new Date().toLocaleDateString(),
          profilePic:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
          isGoogleAccountLinked: false,
        };
        return addUserToFirestore(userCredential.user.uid, newUser)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          }); // TODO: handle better
      }
    } catch (error) {
      const err = error as Error;
      setErrorMessageSignUp(err.message);
      console.error(err.message);
    } finally {
      setUser((current) => ({ ...current, loading: false }));
      reset();
    }
  };

  // function sign in
  const handleSignIn = async (
    email: string,
    password: string,
    reset: ResetFunction,
  ) => {
    setUser((current) => ({ ...current, loading: true }));
    try {
      const userCredential = await authService.signInWithEmail(email, password);
      console.log(userCredential, "MOBB DEEP");
    } catch (error) {
      const err = error as Error;
      setErrorMessageSignIn(err.message);
      console.error(err.message);
    } finally {
      setUser((current) => ({ ...current, loading: false }));
      reset();
    }
  };

  // function Signout
  function signOutUser() {
    setUser((current) => ({ ...current, loading: true }));
    try {
      authService.signOut();
    } catch (error) {
      const err = error as Error;
      console.error(err.message);
      setErrorMessageSignOut(err.message);
    } finally {
      setUser((current) => ({ ...current, loading: true }));
    }
  }

  // function Recover password
  const handleForgotPassword = (email: string) => {
    setUser((current) => ({ ...current, loading: true }));

    return new Promise((resolve, reject) => {
      authService
        .sendPasswordResetEmail(email)
        .then(() => {
          resolve("Email sent successfully"); // Resuelve con un mensaje de éxito
        })
        .catch((error) => {
          const err = error as Error;
          setErrorMessageForgotPassword(err.message);
          reject(err); // Rechaza la promesa si hay un error
        })
        .finally(() => {
          setUser((current) => ({ ...current, loading: false }));
        });
    });
  };

  // useEffect to handle changes in authentication state.
  useEffect(() => {
    // Subscription to Firebase authentication state.
    const subscriber = auth().onAuthStateChanged((firebaseUser) => {
      console.log(firebaseUser?.email);
      if (firebaseUser && !isLinking) {
        // Authenticated user
        setUser((current) => ({
          ...current,
          isLoggedIn: true,
          email: firebaseUser.email || "",
          loading: false,
          uid: firebaseUser.uid,
        }));
      } else {
        // Unauthenticated user
        setUser((current) => ({
          ...current,
          isLoggedIn: false,
          email: "",
          loading: false,
          uid: "",
        }));
      }
    });

    // Cleanup when the component is unmounted.
    return () => subscriber();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        handleSignUp,
        signOutUser,
        handleForgotPassword,
        handleSignIn,
        errorMessageForgotPassword,
        setErrorMessageForgotPassword,
        errorMessageSignIn,
        setErrorMessageSignIn,
        errorMessageSignUp,
        setErrorMessageSignUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// useAuthContext is a custom hook for accessing the authentication context.
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
};
