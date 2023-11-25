import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import { AuthStackParams } from '../navigation/AuthStackNavigator';
import { useAuthContext } from '../hooks/useAuthContext';

type Props = NativeStackScreenProps<AuthStackParams, 'EmailPromptModal'>

export const EmailPromptModal: React.FC<Props> = ({navigation}) => {
  const [email, setEmail] = useState('');

  const { handleForgotPassword } = useAuthContext();

  const handleSubmit = () => {
    handleForgotPassword(email);
    setEmail(''); // Limpiar el campo después de enviar
    navigation.goBack(); // Opcional: cerrar el modal después de enviar
  };

  return (
      <View style={styles.container}>
          <Text style={styles.modalText}>Send Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Ingrese su correo electrónico"
            keyboardType="email-address"
          />
          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={() => navigation.goBack()} />
            <Button title="Send" onPress={handleSubmit} />
          </View>
      </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    input: {
      width: 200,
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
  });
  