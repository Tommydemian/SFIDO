import { SafeAreaView, StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { ImagePickerExample } from '../components/ImagePicker'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { MainStackParams } from '../navigation/MainStackNavigator'
import { Entypo } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

type NavigationProps = NativeStackScreenProps<MainStackParams, 'DemoPreparationScreen'>

const DemoPreparationScreen: React.FC<NavigationProps> = ({navigation}) => {
  const [text, setText] = useState('')
  const [image, setImage] = useState('')

  return (
    <SafeAreaView style={styles.container}>
      {/* Fondo con la imagen seleccionada */}
      <ImageBackground 
        source={{ uri: image }} 
        style={styles.backgroundImage}
        blurRadius={5} // Agrega un leve desenfoque para resaltar el texto
      >
        {/* Área de texto */}
        <TextInput 
          style={styles.textInput}
          maxLength={100}
          value={text}
          multiline={true} 
          placeholder="Write here what you need to listen..." 
          onChangeText={(newText) => setText(newText)} 
          keyboardType='default'
        />

        {/* Selector de imagen */}
        <View style={styles.imagePickerContainer}>
          <ImagePickerExample img={image} setImg={setImage} />
          <Entypo name="camera" size={28} color='#555' />
        </View>

        {/* Botón para continuar */}
        <TouchableOpacity 
          style={styles.continueButton}
          onPress={() => image && navigation.navigate('DemoSettedScreen', {image, text})}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default DemoPreparationScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    width: width - 40,
    padding: 15,
    fontSize: 16,
    color: '#333333',
    backgroundColor: '#FFFFFFAA', // Semi-transparente
    textAlignVertical: 'top',
    minHeight: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignSelf: 'center',
    marginVertical: 20,
  },
  imagePickerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    padding: 10,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 18,
  },
});
