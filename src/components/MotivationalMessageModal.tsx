import { StyleSheet, Text, View, Button, TextInput } from 'react-native'
import React, {useState} from 'react'
import Modal from "react-native-modal";
import { COLORS } from '../../assets/theme';

type Props = {
    isModalVisible: boolean;
    toggleModal: () => void;
}

export const MotivationalMessageModal: React.FC<Props> = ({isModalVisible, toggleModal}) => {
    return (
      <View style={{ flex: 1 }}>
        <Modal style={styles.modalContainer} isVisible={isModalVisible}>
          <View style={{ padding:20 }}>
            <View>
            <Text>Hello!</Text>
            </View>

            <View>
                <TextInput value='hola'  />
            </View>
  
            <View>
                <Text>Gello</Text>
            <Button style={styles.hideModalButton} title="Hide modal" onPress={toggleModal} />
                </View>
          </View>
        </Modal>
      </View>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: COLORS.whiteText,
         borderRadius: 30,
         justifyContent: 'space-around',
    }, 
    hideModalButton: {
        marginTop: 'auto',
        alignSelf: 'flex-end'
    }
})