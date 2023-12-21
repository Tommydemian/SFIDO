import firestore from "@react-native-firebase/firestore";

// function receives email and search in db if the user with email arg field isGoogleAccountLinked is true or false
export const isGoogleAccountLinked = (email: string) => {
  return firestore()
    .collection("users")
    .where("email", "==", email)
    .get()
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        console.log(userDoc.data().isGoogleAccountLinked, "Google log");
        if (userDoc.data().isGoogleAccountLinked) {
          console.log("Account linked to Google ");
          return true;
        } else {
          console.log("Account not linked");
          return false;
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
