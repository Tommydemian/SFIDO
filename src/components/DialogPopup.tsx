import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Button,
} from "react-native";
import Modal from "react-native-modal";
import { COLORS } from "../../assets/theme";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useAuthContext } from "../hooks/useAuthContext";

type Props = {
  visible: boolean;
  email: string;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  googleCredential: FirebaseAuthTypes.AuthCredential;
};

export const DialogPopup: React.FC<Props> = ({
  visible,
  email,
  password,
  setPassword,
  googleCredential,
}) => {
  const [isModalVisible, setModalVisible] = useState(visible);

  const { linkGoogleAccount } = useAuthContext();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handlePassword = (text: string) => {
    setPassword(text);
  };

  useEffect(() => {
    setModalVisible(visible);
    console.log(isModalVisible, "here babe");
  }, [visible]);

  const handleLinkWithGoogle = () => {
    linkGoogleAccount(googleCredential, email, password)
      .then((res) => {
        console.log(res, "atalk to me");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleModal}>
        <Text>Show Modal</Text>
      </TouchableOpacity>

      <Modal
        isVisible={isModalVisible}
        animationIn="slideInLeft" // Animación desde el lado izquierdo
        animationOut="slideOutLeft"
        backdropColor={COLORS.blackBg}
        backdropOpacity={0.9}
        onBackdropPress={toggleModal} // Cierra el modal al tocar el fondo
      >
        <View style={styles.modalContent}>
          <Text>Hello {email}!</Text>
          <Text style={styles.infoText}>
            Please enter your password to link your account with Google.
          </Text>

          <TextInput
            autoCapitalize="none"
            placeholder="password"
            secureTextEntry={true}
            onChangeText={handlePassword}
          />

          <Button title="Link Account" onPress={handleLinkWithGoogle} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.blackBg,
  },
  // modal: {
  //   justifyContent: 'center', // Alinea el modal a un lado
  //   margin: 0, // Elimina cualquier margen predeterminado
  //   backgroundColor: COLORS.orangeWeb
  // },
  modalContent: {
    width: "80%", // O el ancho que prefieras
    height: "40%", // O la altura que prefieras
    backgroundColor: COLORS.whiteText,
    padding: 22,
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 4,
    borderColor: COLORS.silver,
    alignSelf: "center", // Asegúrate de que se centre en el modal
  },
  modalText: {
    color: COLORS.textBlack, // Color del texto dentro del modal
  },
  closeButton: {
    color: COLORS.orangeWeb, // Color del texto del botón de cierre
  },
  infoText: {
    color: COLORS.textBlack, // Color del texto
    fontSize: 16, // Tamaño de la fuente
    textAlign: "center", // Alineación del texto
    marginVertical: 10, // Margen vertical para separarlo de otros elementos
  },
});
