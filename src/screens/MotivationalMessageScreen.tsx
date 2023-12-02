import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { MotivationalMessageModal } from '../components/MotivationalMessageModal'

export const MotivationalMessageScreen = () => {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };
  return (
    <View>
      <Text>MotivationalMessageScreen</Text>

      <TouchableOpacity onPress={toggleModal}><Text>Show Modal</Text></TouchableOpacity>
  
      <MotivationalMessageModal isModalVisible={isModalVisible} toggleModal={toggleModal} />
    </View>
  )
}

const styles = StyleSheet.create({})