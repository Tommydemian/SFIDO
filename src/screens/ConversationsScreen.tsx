import { StyleSheet, Text, View, TouchableOpacity, TextInput, Pressable, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { UpperBarNav } from '../components/UpperBarNav'
import { requestPermissions, scheduleNotifications } from '../services/notificationsService'
import { DateAndTimePicker } from '../components/DateTimePicker';
import { useSetLocalNotifDate } from '../hooks/useSetLocalNotifDate';

import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { COLORS } from '../../assets/theme';

type PickerMode = 'date' | 'time'

export const ConversationsScreen = () => {
//const {handleDateChange, localNotifDate, showDatePicker, toggleDatePickerVisibility, date } = useSetLocalNotifDate();

const [selectedDate, setSelectedDate] = useState(new Date())
// const [showDatePicker, setShowDatePicker] = useState(false)
// time picker
const [selectedTime, setSelectedTime] = useState(new Date())
const [showPicker, setShowPicker] = useState(false)

const [mode, setMode] = useState<PickerMode>('date')
const [res, setRes] = useState('')
const [uiRes, setUiRes] = useState('')

const setModeAndShowPicker = (currentMode: PickerMode ) => {
  setShowPicker(true)
  setMode(currentMode)
}

const handleChange = (event: DateTimePickerEvent, newDate?: Date) => {
  setShowPicker(Platform.OS === 'ios');

  if (mode === 'date') {
    const updatedDate = newDate ? new Date(newDate.setHours(selectedTime.getHours(), selectedTime.getMinutes())) : selectedDate;
    setSelectedDate(updatedDate);
    const formattedDate = `${updatedDate.getFullYear()}/${updatedDate.getMonth() + 1}/${updatedDate.getDate()}`;
    setRes(formattedDate + ' ' + res.split(' ')[1]); // Actualiza res manteniendo la hora
    setUiRes(updatedDate.toDateString());
  } else if (mode === 'time') {
    const updatedTime = newDate ? new Date(selectedDate.setHours(newDate.getHours(), newDate.getMinutes())) : selectedTime;
    setSelectedTime(updatedTime);
    const formattedTime = `${updatedTime.getHours()}:${updatedTime.getMinutes()}`;
    setRes(res.split(' ')[0] + ' ' + formattedTime); // Actualiza res manteniendo la fecha
    setUiRes(uiRes + ' ' + updatedTime.toTimeString().split(' ')[0]);
  }
};



useEffect(() => {
  console.log(selectedDate);
  
}, [selectedDate, selectedTime])

const handleScheduleNotification = () => {
  scheduleNotifications({
    selectedDateString: res, // Asegúrate de que res tenga el formato 'YYYY/MM/DD HH:mm'
    body: 'lookSon',
    title: 'lookSon',
    data: {data: 'lookSon'}
  });
};

  return (
    <View>
      <UpperBarNav />
      <TouchableOpacity onPress={requestPermissions}><Text>Request Permission</Text></TouchableOpacity>
      <TouchableOpacity onPress={handleScheduleNotification}><Text>Send Notification</Text></TouchableOpacity>
      <Text>ConversationsScreen</Text>

      <TouchableOpacity onPress={() => setModeAndShowPicker('date')}><Text>Open DatePicker</Text></TouchableOpacity>

      { showPicker && (<DateTimePicker 
      mode={mode}
      display='default'
      onChange={handleChange}
      value={selectedDate}
      is24Hour={true}
      minimumDate={new Date()}
      />)
      }
       <Text>{res}</Text>

       <TouchableOpacity onPress={() => setModeAndShowPicker('time')}><Text>Open TimePicker</Text></TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  pressable: {
    backgroundColor: 'red', 
    width: '100%',
    height: 200
  }, 
})