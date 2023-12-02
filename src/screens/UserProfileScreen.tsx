import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Modal } from 'react-native'
import { UpperBarNav } from '../components/UpperBarNav'
import React, { useEffect, useState } from 'react';
import DatePicker, {getToday, getFormatedDate} from 'react-native-modern-datepicker';
import { COLORS } from '../../assets/theme';
import { scheduleNotifications } from '../services/notificationsService';

export const UserProfileScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [isVisible, setIsVisible] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const today = new Date()
  const todayTimeStamp = today.setDate(today.getDate());
  const startDate = getFormatedDate(new Date(todayTimeStamp), 'YYYY-MM-DD');


  useEffect(() => {
    console.log(selectedDate);
  }, [selectedDate])

  const handleChange = (propDate: string) => {
   setSelectedDate(propDate)
  }

  const handleOnPress = () => {
    setIsModalVisible(current => !current)
  }

  const handleScheduleNotification = () => {
    scheduleNotifications({
      selectedDateString: selectedDate,
      body: 'main',
      title: 'main',
      data: {data: 'main'}})
  }

  return (
    <SafeAreaView style={styles.container}>

  <TouchableOpacity onPress={handleOnPress}>
    <Text>Open</Text>
  </TouchableOpacity>

  <Modal
  animationType='slide'
  transparent={true}
  visible={isModalVisible}
  >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>

      <DatePicker
      onSelectedChange={date => setSelectedDate(date)}
      onDateChange={handleChange}
      options={{
        backgroundColor: '#090C08',
        textHeaderColor: '#FFA25B',
        textDefaultColor: '#F6E7C1',
        selectedTextColor: '#fff',
        mainColor: '#F4722B',
        textSecondaryColor: '#D6C7A1',
        borderColor: 'rgba(122, 146, 165, 0.1)',
      }}
      minimumDate={startDate}
      minuteInterval={3}
      current={startDate}
      selected={startDate}
      style={{ borderRadius: 10 }}
    />

      <TouchableOpacity onPress={handleOnPress}>
    <Text>Close</Text>
  </TouchableOpacity>

  


      </View>
    </View>

  </Modal>

  <TouchableOpacity onPress={handleScheduleNotification}>
    <Text>Shedule Notification</Text>
  </TouchableOpacity>



    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor: COLORS.silver
  }, 
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20, 
    backgroundColor: COLORS.whiteText,
    borderRadius: 20,
    width: '90%', 
    padding: 5,
    alignItems: 'center', 
    shadowColor: COLORS.blackBg, 
    shadowOffset: {
      width: 0, 
      height: 2
    }, 
    shadowOpacity: 0.25,
    shadowRadius: 4, 
    elevation: 5 

  }
})