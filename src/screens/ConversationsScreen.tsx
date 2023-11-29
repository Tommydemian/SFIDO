import { StyleSheet, Text, View, TouchableOpacity, TextInput, Pressable, Platform } from 'react-native'
import React, {useState, useCallback} from 'react'
import { UpperBarNav } from '../components/UpperBarNav'
import { useRef, useEffect } from 'react'
import * as Notifications from 'expo-notifications';
import DateTimePicker from '@react-native-community/datetimepicker';


import { requestPermissions, scheduleNotifications } from '../services/notificationsService'
import { DateAndTimePicker } from '../components/DateTimePicker';
import { useSetLocalNotifDate } from '../hooks/useSetLocalNotifDate';

export const ConversationsScreen = () => {
const {handleChange, localNotifDate, showPicker, togglePickerVisibility, date } = useSetLocalNotifDate();

  return (
    <View>
      <UpperBarNav />
      <TouchableOpacity onPress={requestPermissions}><Text>Request Permission</Text></TouchableOpacity>
      <TouchableOpacity onPress={scheduleNotifications}><Text>Send Notification</Text></TouchableOpacity>
      <Text>ConversationsScreen</Text>

          {
            showPicker && (
              <DateAndTimePicker
            value={date}
            onChange={handleChange}
        />
            )
          }
          {
            !showPicker && (
              <Pressable style={styles.pressable} onPress={togglePickerVisibility}>
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