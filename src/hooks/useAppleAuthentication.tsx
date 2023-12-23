import * as AppleAuthentication from 'expo-apple-authentication';
import { signInWithApple } from '../services/appleServices';
import { addUserToFirestore } from '../services/userService';
import { type DbUser } from '../types';
import firestore from '@react-native-firebase/firestore';

export const useAppleAuthentication = () => {
  const handleAppleSignIn = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      if (credential.identityToken)
        signInWithApple({ identityToken: credential.identityToken });
      console.log('credential', credential);

      // create user based on Apple response
      const newUser: DbUser = {
        email: credential.email || 'No Email provided',
        uid: credential.user,
        insertedAt: firestore.Timestamp.now().toDate(),
        quoteIndex: 1,
        lastQuoteUpdate: new Date().toLocaleDateString(),
        profilePic: '', // Apple does not provide photo URL
        isGoogleAccountLinked: false,
      };

      // Add user to firestore
      addUserToFirestore(credential.user, newUser);

      // signed in
    } catch (e) {
      if (e instanceof Error && 'code' in e)
        if (e.code === 'ERR_REQUEST_CANCELED') {
          // handle that the user canceled the sign-in flow
        } else {
          // handle other errors
        }
    }
  };

  return { handleAppleSignIn };
};
