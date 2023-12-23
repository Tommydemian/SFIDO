import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

export const sendPasswordResetEmail = async (email: string) => {
  try {
    await auth().sendPasswordResetEmail(email);
  } catch (error) {
    if (error instanceof Error && 'code' in error) {
      throw new Error(
        mapAuthErrorToMessage(
          error as FirebaseAuthTypes.NativeFirebaseAuthError,
        ),
      );
    } else {
      throw new Error('An unexpected error occurred.');
    }
  }
};

export const signUpWithEmail = async (
  email: string,
  password: string,
): Promise<FirebaseAuthTypes.UserCredential> => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    return userCredential;
  } catch (error) {
    if (error instanceof Error && 'code' in error) {
      throw new Error(
        mapAuthErrorToMessage(
          error as FirebaseAuthTypes.NativeFirebaseAuthError,
        ),
      );
    } else {
      throw new Error('An unexpected error occurred.');
    }
  }
};

export const signInWithEmail = async (
  email: string,
  password: string,
): Promise<FirebaseAuthTypes.UserCredential> => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(
      email,
      password,
    );
    return userCredential;
  } catch (error) {
    if (error instanceof Error && 'code' in error) {
      throw new Error(
        mapAuthErrorToMessage(
          error as FirebaseAuthTypes.NativeFirebaseAuthError,
        ),
      );
    } else {
      throw new Error('An unexpected error occurred.');
    }
  }
};

export const signOut = async () => {
  try {
    await auth().signOut();
  } catch (error) {
    if (error instanceof Error && 'code' in error) {
      throw new Error(
        mapAuthErrorToMessage(
          error as FirebaseAuthTypes.NativeFirebaseAuthError,
        ),
      );
    } else {
      throw new Error('An unexpected error occurred.');
    }
  }
};

// All relevant service errors are centralized in this function.
// All fucntions use it within it's catch block
const mapAuthErrorToMessage = (
  error: FirebaseAuthTypes.NativeFirebaseAuthError,
): string => {
  switch (error.code) {
    case 'auth/email-already-exists':
      return 'The email address is already in use by another account.';
    case 'auth/invalid-email':
      return 'The email address is invalid.';
    case 'auth/operation-not-allowed':
      return 'Email and password accounts are not enabled.';
    case 'auth/weak-password':
      return 'The password is too weak.';
    case 'auth/user-disabled':
      return 'This user account has been disabled.';
    case 'auth/user-not-found':
      return 'There is no user record corresponding to this identifier.';
    case 'auth/wrong-password':
      return 'The password is invalid for the given email.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later.';
    case 'auth/internal-error':
      return 'An internal error has occurred. Please try again.';
    default:
      return 'An unexpected error occurred.';
  }
};
