import firestore from "@react-native-firebase/firestore";

export const getCategoriesFromFirestore = () => {
  return firestore().collection("categories").get();
};
