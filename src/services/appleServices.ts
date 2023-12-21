import auth from "@react-native-firebase/auth";

export const signInWithApple = async (appleAuthCredential: {
  identityToken: string;
}) => {
  try {
    const appleCredential = auth.AppleAuthProvider.credential(
      appleAuthCredential.identityToken,
    );
    return auth().signInWithCredential(appleCredential);
  } catch (error) {
    console.error("Error al iniciar sesión con Apple:", error);
    throw error; // Lanza el error para manejarlo en el lugar donde se llama a esta función
  }
};
