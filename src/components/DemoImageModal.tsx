import { Modal, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

import { SubmitButton } from './SubmitButton'
import { NunitoText } from './NunitoText'
import { COLORS, SPACING } from '../../assets/theme'

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
                        customStyles={[styles.submitButton, styles.success]}
                        onPress={() => handleModalSelectedImage(selectedImage)}
                        >
                            <NunitoText 
                            customStyles={styles.submitButtonText}
                            type='bold'
                            >
                                Confirm
                            </NunitoText>
                        </SubmitButton>
                        </View>
                        <View style={styles.submitButtonContainer} >
                        
                        <SubmitButton 
                        customStyles={[styles.submitButton, styles.error]}
                        onPress={() => setIsModalVisible(false)}>
                        <NunitoText 
                        type='bold'
                        customStyles={styles.submitButtonText}>
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente para el overlay
    },
    contentContainer: {
        backgroundColor: COLORS.whiteText,
        padding: SPACING.spacing10,
        borderRadius: 10,
        width: '90%', // Ajusta el ancho al 80% de la pantalla
        alignSelf: 'center',
    },
    image: {
        width: '100%', // Ajusta según sea necesario
        height: '80%', // Ajusta según sea necesario
        resizeMode: 'contain',
    },
    buttonContainer: {
        flexDirection: 'row',
        columnGap: SPACING.spacing20,
    },
    submitButtonContainer: {
        flexGrow: 1, 
    }, 
    submitButton: {
        backgroundColor: 'red'
    }, 
    submitButtonText: {
        textAlign: 'center',
    }, 
    success: {
        backgroundColor: COLORS.successGreen
    }, 
    error: {
        backgroundColor: COLORS.errorRed
    }
    // ... otros estilos
});
