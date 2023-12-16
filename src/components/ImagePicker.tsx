import React, { useState, useEffect } from 'react';
import { Image, View, Platform, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { CameraButton } from './CameraButton';

type Props = {
    img: string;
    setImg: React.Dispatch<React.SetStateAction<string>>
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
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <CameraButton onPress={pickImage} />
            <View style={styles.imageContainer}>
            {img && <Image source={{ uri: img }} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        width: '50%',
        height: '50%', 
        borderRadius: 30, 
        borderWidth: 3, 
        borderColor: 'red'       
    }
})