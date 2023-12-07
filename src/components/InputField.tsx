import { StyleSheet, Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import { BORDER, COLORS, SPACING } from '../../assets/theme';
import { Control, Controller } from 'react-hook-form';

type Props = TextInputProps & {
    label?: string; 
    placeholder: string;
    secureTextEntry: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    name: string;
    autoCapitalize: string;
    control: Control;
    rules: object;
    setVisibility: boolean;
    customStyles?: object;
}

export const InputField: React.FC<Props> = ({label, customStyles, setVisibility, name,autoCapitalize, control ,placeholder, secureTextEntry, rules = {}, leftIcon, rightIcon, ...rest }) => {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const handlePasswordVisibiliy = () => {
    if (setVisibility) {
      setIsPasswordVisible(current => !current)
    }
  }

  return (
    <Controller 
    control={control}
    name={name}
    rules={rules}
    render={({field: {value, onChange, onBlur}, fieldState:{error} }) => (
      <>
      <Text style={styles.inputFieldLabel}>{label && label}</Text>
      <View style={styles.outerInputFieldContainer}>
      {leftIcon && <View style={styles.inputFieldLeftIcon}>{leftIcon}</View>}
    <View style={[styles.inputFieldContainer, {borderColor: error && 'red'}]}>
      <TextInput 
        style={[customStyles], styles.input}
       {...rest}
       value={value}
       onChangeText={onChange}
       onBlur={onBlur}
       secureTextEntry={isPasswordVisible}
       placeholder={placeholder}
       autoCapitalize={autoCapitalize}
       placeholderTextColor={COLORS.inputGrayText}
       />
       {rightIcon && <TouchableOpacity onPress={handlePasswordVisibiliy} style={styles.inputFieldRightIcon}>{rightIcon}</TouchableOpacity>}
    </View>
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
    backgroundColor: COLORS.whiteText, 
    borderRadius: BORDER.buttons, // Aumenta para más redondez
    paddingVertical: SPACING.spacing10, // Aumenta para más altura
    marginBottom: 10, 
    width: 'auto',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: "#000", // Color de la sombra
    shadowOffset: {
      width: 0, // Desplazamiento horizontal de la sombra
      height: 2, // Desplazamiento vertical de la sombra
    },
    shadowOpacity: 0.25, // Opacidad de la sombra
    shadowRadius: 3.84, // Radio de difuminado de la sombra
    elevation: 5, // Elevación para Android
  }, 
  inputFieldLeftIcon: {
    marginRight: 5 
  }, 
  inputFieldRightIcon: {
    marginLeft: 'auto',
    paddingRight: 10 
  }, 
  errorText: {
    color: 'red',  
    alignSelf: 'stretch',
    fontWeight: '400'
  }, 
  outerInputFieldContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    width: '100%',
  }, 
  input: {
    paddingLeft: 20
  }
})