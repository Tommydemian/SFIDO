// services/authService.js
import auth from '@react-native-firebase/auth';

export const sendPasswordResetEmail = (email: string) => {
  return auth().sendPasswordResetEmail(email);
};
