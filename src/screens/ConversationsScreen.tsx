import { StyleSheet, Text, View, TouchableOpacity, TextInput, Pressable, Platform } from 'react-native'
import React, { useEffect } from 'react'
import { UpperBarNav } from '../components/UpperBarNav'
import { requestPermissions, scheduleNotifications } from '../services/notificationsService'
import { DateAndTimePicker } from '../components/DateTimePicker';
import { useSetLocalNotifDate } from '../hooks/useSetLocalNotifDate';

export const ConversationsScreen = () => {
const {handleDateChange, localNotifDate, showDatePicker, toggleDatePickerVisibility, date } = useSetLocalNotifDate();

useEffect(() => {
  console.log(showDatePicker);
  
}, [showDatePicker])

  return (
    <View>
      <UpperBarNav />
      <TouchableOpacity onPress={requestPermissions}><Text>Request Permission</Text></TouchableOpacity>
      <TouchableOpacity onPress={scheduleNotifications}><Text>Send Notification</Text></TouchableOpacity>
      <Text>ConversationsScreen</Text>

          {
            showDatePicker && (
              <DateAndTimePicker
            mode='date'
            value={date}
            onChange={handleDateChange}
        />
            )
          }
          {
            !showDatePicker && (
              <Pressable style={styles.pressable} onPress={toggleDatePickerVisibility}>
                <TextInput 
                    placeholder='Select Date'
                    value={localNotifDate.toDateString()}
                    editable={false}
                />
            </Pressable>
            )
          }
    </View>
  )
}

const styles = StyleSheet.create({
  pressable: {
    backgroundColor: 'red', 
    width: '100%',
    height: 200
  }
})