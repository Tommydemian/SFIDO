import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Pressable,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { UpperBarNav } from '../components/UpperBarNav';
import {
  requestPermissions,
  scheduleNotifications,
} from '../services/notificationsService';
// import { DateAndTimePicker } from '../components/DateTimePicker';
// import { useSetLocalNotifDate } from '../hooks/useSetLocalNotifDate';
import { useDateTimePicker } from '../hooks/useDateTimePicker';

import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { COLORS } from '../../assets/theme';

// type PickerMode = 'date' | 'time'

export const ConversationsScreen = () => {
  const { date, handleChange, mode, res, setModeAndShowPicker, showPicker } =
    useDateTimePicker();

  // const [date, setDate] = useState(new Date())
  // const [showPicker, setShowPicker] = useState(false)
  // const [mode, setMode] = useState<PickerMode>('date')
  // const [res, setRes] = useState('')

  // const setModeAndShowPicker = (currentMode: PickerMode ) => {
  //   setShowPicker(true)
  //   setMode(currentMode)
  // }

  // const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
  //   const currentDate = selectedDate || date
  //   setShowPicker(Platform.OS === 'ios')
  //   setDate(currentDate)

  //   let tempDate = new Date(currentDate)
  //   let fullDate =  tempDate.getDate() + '/' + (tempDate.getMonth()) + '/' + tempDate.getFullYear()
  //   let fullTime = 'Hour: ' + tempDate.getHours() + ':' + tempDate.getMinutes()
  //   setRes(fullDate + ' ' + fullTime)

  // }

  const handleScheduleNotification = () => {
    scheduleNotifications({
      selectedDate: date,
      body: 'lookSon',
      title: 'lookSon',
      data: { data: 'lookSon' },
    });
  };

  return (
    <View>
      <UpperBarNav />
      <TouchableOpacity onPress={requestPermissions}>
        <Text>Request Permission</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleScheduleNotification}>
        <Text>Send Notification</Text>
      </TouchableOpacity>
      <Text>ConversationsScreen</Text>

      <TouchableOpacity onPress={() => setModeAndShowPicker('date')}>
        <Text>Open DatePicker</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          mode={mode}
          display="default"
          onChange={handleChange}
          value={date}
          is24Hour={true}
          minimumDate={new Date()}
        />
      )}
      <Text>{res}</Text>

      <TouchableOpacity onPress={() => setModeAndShowPicker('time')}>
        <Text>Open TimePicker</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  pressable: {
    backgroundColor: 'red',
    width: '100%',
    height: 200,
  },
});
