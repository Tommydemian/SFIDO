import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSetLocalNotifDate } from '../hooks/useSetLocalNotifDate';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';

type Props = {
  mode: 'date' | 'time';
  value: Date;
  onChange: (event: DateTimePickerEvent, selectedDate?: Date) => void;
};

export const DateAndTimePicker: React.FC<Props> = ({
  value,
  onChange,
  mode,
}) => {
  return (
    <DateTimePicker
      mode={mode}
      display="spinner"
      value={value}
      onChange={onChange}
    />
  );
};
