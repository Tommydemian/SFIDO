import { StyleSheet, Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import { COLORS } from '../theme';
import { Control, Controller } from 'react-hook-form';

type Props = TextInputProps & {
    label: string; 
    placeholder: string;
    secureTextEntry: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    name: string;
    autoCapitalize: string;
    control: Control;
    rules: object;
    setVisibility: boolean;
}

export const InputField: React.FC<Props> = ({label, setVisibility, name,autoCapitalize, control ,placeholder, secureTextEntry, rules = {}, leftIcon, rightIcon, ...rest }) => {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const handlePasswordVisibiliy = () => {
    if (setVisibility) {
      setIsPasswordVisible(current => !current)
    }
  }

  // useEffect(() => {
  //   console.log(isPasswordVisible);
  // }, [isPasswordVisible])

  return (
    <Controller 
    control={control}
    name={name}
    rules={rules}
    render={({field: {value, onChange, onBlur}, fieldState:{error} }) => (
      <>
      <Text style={styles.inputFieldLabel}>{label}</Text>
    <View style={[styles.inputFieldContainer, {borderColor: error && 'red'}]}>
      {leftIcon && <View style={styles.inputFieldLeftIcon}>{leftIcon}</View>}
      <TextInput 
       {...rest}
       value={value}
       onChangeText={onChange}
       onBlur={onBlur}
       secureTextEntry={isPasswordVisible}
       placeholder={placeholder}
       autoCapitalize={autoCapitalize}
       />
       {rightIcon && <TouchableOpacity onPress={handlePasswordVisibiliy} style={styles.inputFieldRightIcon}>{rightIcon}</TouchableOpacity>}
    </View>
    {
      error && <Text style={styles.errorText}>{error.message || 'Error'}</Text>
    }
    </>
    )}
    />
    
  )
}

const styles = StyleSheet.create({
  inputFieldLabel: {
    fontWeight: '500'
  },
  inputFieldContainer: {
    backgroundColor: COLORS.ligthGray, 
    borderRadius: 10,
    paddingVertical: 10, 
    borderWidth: 1,
    borderColor: COLORS.darkGray,
    marginTop:5,
    marginBottom: 10, 
    flexDirection: 'row',
    alignItems: 'center'
  }, 
  inputFieldLeftIcon: {
    alignSelf: 'flex-start', 
    paddingRight: 10, 
    paddingLeft: 5
  }, 
  inputFieldRightIcon: {
    marginLeft: 'auto',
    paddingRight: 10 
  }, 
  errorText: {
    color: 'red',  
    alignSelf: 'stretch',
    fontWeight: '400'
  }
})