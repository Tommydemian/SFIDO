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

export const setIsGoogleAccountLinkedToTrue = (email: string) => {
    return firestore().collection('users').where('email', '==', email).get()
    .then((querySnapshot) => {
        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            userDoc.ref.update({isGoogleAccountLinked: true})
        } else {
            console.log('No user found for that email address, sorry');
            return null 
        }
    }).catch((error) => {
        console.log(error); 
    } )
}

export const isUserGoogleAccountLinked = (email: string) => {
    return firestore().collection('users').where('email', '==', email).get()
    .then((querySnapshot) => {
        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            console.log(userDoc.data().isGoogleAccountLinked, 'Google log');
            if (userDoc.data().isGoogleAccountLinked) {
                console.log('Account linked to Google ');
                return true
            } else {
                console.log('Account not linked');
                return false
            }
        }
    }).catch((error) => {
        console.log(error);     
    })
}