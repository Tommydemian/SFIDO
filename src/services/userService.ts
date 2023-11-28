import firestore from '@react-native-firebase/firestore';
import { DbUser } from '../types';

export const addUserToFirestore = (uid: string, userData: DbUser) => {
    return firestore().collection('users').doc(uid).set(userData);
}

export const addIntererstsToFirestoreUser = (userID: string, interests: number[] ) => {
    return firestore().collection('users').doc(userID).update({
        interests: interests
    })
}

export const checkIfUserExistsInFirestore = (email: string) => {
    return firestore().collection('users').where('email', '==', email).get()
    .then((querySnapshot) => {
        return !querySnapshot.empty;
    }).catch(() => {
        return false; // O manejar el error de manera más específica
    });
}
