import { StyleSheet, Text, View, Button } from 'react-native'
import React, { useState } from 'react'
import Modal from "react-native-modal";
import { BORDER, COLORS } from '../../assets/theme';
import { NunitoText } from './NunitoText';
import { SubmitButton } from './SubmitButton';


export const DemoModal = () => {

 const [isVisible, setIsVisible] = useState(true)

 const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  return (
    <Modal isVisible={isVisible} style={styles.modalContainer}>
    <View style={styles.demoModal}>
    <NunitoText customStyles={styles.demoModalContent}>
    {"Hi there 👋!"}
    {"\n\n"}
    {"Welcome to a quick demonstration of how SFIDO works. Here, you'll get a glimpse of what your personalized motivational messages will look and feel like."}
    {"\n\n"}
    {"Ready to start this experience? Let's go!"}
</NunitoText>
      <SubmitButton onPress={toggleModal}><NunitoText type='bold' customStyles={styles.demoModalButtonText}>Continue</NunitoText></SubmitButton>
    </View>
  </Modal>
  )
}

const styles = StyleSheet.create({
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0, // This ensures the modal is centered
      },
    demoModal: {
        backgroundColor: COLORS.whiteText,
        borderRadius: BORDER.buttons,
        width: 300, // Adjust width as needed
        height: 300, // Adjust height as needed
        justifyContent: 'center',
        alignItems: 'center',
      },
      demoModalContent: {
        color: COLORS.blackSecondaryText, 
        padding: 10,
        lineHeight: 24, 
      }, 
      demoModalButtonText: {
        paddingHorizontal: 30, 
      }
})