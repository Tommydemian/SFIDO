import firestore from '@react-native-firebase/firestore';

export const getInterestsFromFirestore = () => {
  return firestore().collection('interests').get();
}