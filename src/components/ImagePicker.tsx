import React, { useState, useEffect } from 'react';
import { Image, View, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Entypo } from '@expo/vector-icons';
import { COLORS, SPACING } from '../../assets/theme';

type Props = {
    img: string;
    setImg: (uri:string) => void;
}

export const  ImagePickerExample: React.FC<Props> = ({img, setImg}) => {

    useEffect(() => {
        console.log(img);
      }, [img]);

    const pickImage = async () => {
        // Solicitar permisos de la galería
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Lo siento, necesitamos permisos para acceder a tus fotos!');
            return;
        }

        // Lanzar el selector de imágenes
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1
        });

        if (result) {
            if (result.assets) {
                setImg(result.assets[0].uri);      
            }
        }
    };

    return (
        <View style={styles.imagePickerContainer}>
        <TouchableOpacity onPress={pickImage} style={styles.cameraButton}>
            <Entypo name="camera" size={SPACING.spacing30} color={COLORS.whiteText} />
        </TouchableOpacity>
          {/* <NunitoText customStyles={styles.cameraText}>Press to select an image</NunitoText> */}
    </View>
    );
}

const styles = StyleSheet.create({
    imagePickerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
      },
        cameraButton: {
            borderRadius: 100,
            backgroundColor: COLORS.folly, // O el color que prefieras
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: SPACING.spacing10,
            padding: SPACING.spacing10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        imageContainer: {
            width: 300,
            height: 300,
            borderRadius: 30,
            borderWidth: 3,
            borderColor: 'red',
            overflow: 'hidden', // Asegura que la imagen no se salga del borde redondeado
        },
        image: {
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
        },
        cameraText: {
            fontSize: 14,
            marginTop: 5,
          },
})