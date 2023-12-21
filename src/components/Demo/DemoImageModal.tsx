import { Modal, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

import { SubmitButton } from '../SubmitButton'
import { NunitoText } from '../NunitoText'
import { COLORS, SPACING } from '../../../assets/theme'

type Props = {
    selectedImage: string;
    isModalVisible: boolean;
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    handleModalSelectedImage: (seletedImage: string) => void;
}

export const DemoImageModal: React.FC<Props> = ({ selectedImage, isModalVisible, setIsModalVisible, handleModalSelectedImage }) => {
    return (
        <Modal
           visible={isModalVisible}
           animationType='fade'
           transparent={true}
        >
            <View style={styles.modalContainer}>
                {selectedImage && (
                    <View style={styles.contentContainer}>
                        <Image 
                        source={{ uri: selectedImage }}
                        style={styles.image} 
                        />
                        <View style={styles.buttonContainer}>
                        <View style={styles.submitButtonContainer}>
                        
                        <SubmitButton 
                        success
                        customStyles={[styles.submitButton]}
                        onPress={() => handleModalSelectedImage(selectedImage)}
                        >
                            <NunitoText 
                            customStyles={[styles.submitButtonText, styles.successText]}
                            type='bold'
                            >
                                Confirm
                            </NunitoText>
                        </SubmitButton>
                        </View>
                        <View style={styles.submitButtonContainer} >
                        
                        <SubmitButton 
                        error
                        customStyles={[styles.submitButton]}
                        onPress={() => setIsModalVisible(false)}>
                        <NunitoText 
                        type='bold'
                        customStyles={[styles.submitButtonText, styles.errorText]}>
                            Cancel</NunitoText>
                        </SubmitButton>
                                </View>
                            </View>
                        </View>
                    )}
                </View>
            </Modal>
        );
};    

// Estilos para DemoImageModal
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
    },
    contentContainer: {
        backgroundColor: COLORS.whiteText,
        width: '90%', // Ajusta el ancho al 90% de la pantalla
        borderRadius: 10,
        overflow: 'hidden', // Asegura que todo el contenido se quede dentro de los bordes redondeados
    },
    image: {
        width: '100%', // Ocupa todo el ancho
        height: undefined, // Altura indefinida para mantener la proporción
        aspectRatio: 1, // Mantiene la proporción de la imagen
        resizeMode: 'cover', // Cubre el área asignada
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly', // Distribuye los botones uniformemente
        padding: SPACING.spacing10,
    },
    submitButtonContainer: {
        flex: 1, // Cada botón ocupa la mitad del espacio
    },
    submitButton: {
        marginHorizontal: SPACING.spacing5, // Añade un pequeño margen entre los botones
        backgroundColor: 'transparent',
    },
    submitButtonText: {
        textAlign: 'center',
    },
    successText: {
        color: COLORS.successGreen
    },
    errorText: {
        color: COLORS.errorRed
    }
});
