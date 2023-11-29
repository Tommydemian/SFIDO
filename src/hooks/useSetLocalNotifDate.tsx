import { useState, useCallback } from "react";
import { Platform } from 'react-native';
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";

export const useSetLocalNotifDate = () => {
    const [localNotifDate, setLocalNotifDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [date, setDate] = useState(new Date())

    const togglePickerVisibility = useCallback(() => {
        setShowPicker(current => !current);
    }, []);

    const handleChange = (event: DateTimePickerEvent, selectedDate?:Date ) => {        
        if (event.type === 'set') {
            const currentDate = selectedDate;
            setDate(currentDate!);
            if (Platform.OS === 'android') {
                togglePickerVisibility();
                setLocalNotifDate(currentDate!)
            }
        } else if (Platform.OS === 'android') {
            togglePickerVisibility();
        }
      };

    return { localNotifDate, handleChange, showPicker, togglePickerVisibility, date };
};
