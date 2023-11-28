import firestore from '@react-native-firebase/firestore';
import { DbUser } from '../types';

export const addUserToFirestore = (userData: DbUser) => {
    return firestore().collection('users').add(userData);
}

export const addIntererstsToFirestoreUser = (userID: string, interests: number[] ) => {
    return firestore().collection('users').doc(userID).update({
        interests: interests
    })
}

  