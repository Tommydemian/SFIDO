import { useState, useCallback } from 'react';
import { Platform } from 'react-native';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';

export const useSetLocalNotifDate = () => {
  const [localNotifDate, setLocalNotifDate] = useState(new Date());
  const [localNotifTime, setLocalNotiTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const toggleDatePickerVisibility = useCallback(() => {
    setShowDatePicker((current) => !current);
  }, []);

  const toggleTimePickerVisibility = useCallback(() => {
    setShowTimePicker((current) => !current);
  }, []);

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    if (event.type === 'set') {
      const currentDate = selectedDate;
      setDate(currentDate!);
      if (Platform.OS === 'android') {
        toggleDatePickerVisibility();
        setLocalNotifDate(currentDate!);
      }
    } else if (Platform.OS === 'android') {
      toggleDatePickerVisibility();
    }
  };

  const handleTimeChange = (
    event: DateTimePickerEvent,
    selectedTime?: Date,
  ) => {
    if (event.type === 'set') {
      const currentTime = selectedTime;
      setTime(currentTime!); // Actualiza el estado 'time' si es necesari
      if (Platform.OS === 'android') {
        toggleTimePickerVisibility(); // Oculta el selector en Android después de seleccionar
        setLocalNotiTime(currentTime!);
      }
    } else if (Platform.OS === 'android') {
      toggleTimePickerVisibility(); // Oculta el selector si se cancela la selección
    }
  };

  return {
    localNotifDate,
    handleDateChange,
    showDatePicker,
    toggleDatePickerVisibility,
    toggleTimePickerVisibility,
    date,
    showTimePicker,
    time,
    localNotifTime,
    handleTimeChange,
  };
};
