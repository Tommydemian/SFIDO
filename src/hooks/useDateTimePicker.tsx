import { useState } from "react"
import { DateTimePickerEvent } from "@react-native-community/datetimepicker"
import { Platform } from "react-native"

type PickerMode = 'date' | 'time'

export const useDateTimePicker = () => {
const [date, setDate] = useState(new Date())
const [showPicker, setShowPicker] = useState(false)
const [mode, setMode] = useState<PickerMode>('date')
const [res, setRes] = useState('')

const setModeAndShowPicker = (currentMode: PickerMode ) => {
  setShowPicker(true)
  setMode(currentMode)
}

const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
  const currentDate = selectedDate || date
  setShowPicker(Platform.OS === 'ios')
  setDate(currentDate)

  let tempDate = new Date(currentDate)
  let fullDate =  tempDate.getDate() + '/' + (tempDate.getMonth()) + '/' + tempDate.getFullYear()
  let fullTime = 'Hour: ' + tempDate.getHours() + ':' + tempDate.getMinutes() 
  setRes(fullDate + ' ' + fullTime)

}

    return {date, showPicker, mode, res, setModeAndShowPicker, handleChange}

}

 