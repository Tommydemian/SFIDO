import firestore from '@react-native-firebase/firestore';

export const getQuotesFromFirestore = () => {
  return firestore().collection('quotes').get();
}
