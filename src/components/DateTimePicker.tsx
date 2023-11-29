import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSetLocalNotifDate } from '../hooks/useSetLocalNotifDate';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';

type Props = {
    value: Date;
    onChange: (event: DateTimePickerEvent, selectedDate?: Date) => void
}

export const DateAndTimePicker: React.FC<Props> = ({value, onChange}) => {
    return (
        <DateTimePicker 
            mode="date"
            display='spinner'
            value={value}
            onChange={onChange}
        />
    )
};
