import { StyleSheet, Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import { BORDER, COLORS, SPACING } from '../../assets/theme';
import { Control, Controller } from 'react-hook-form';
import { NunitoText } from './NunitoText';

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
    onInputChange?: () => void; 
    handlePassworsSecured: () => void;
}

export const InputField: React.FC<Props> = ({label, onInputChange, customStyles, setVisibility, name,autoCapitalize, control, placeholder, secureTextEntry, handlePassworsSecured, rules = {}, leftIcon, rightIcon, ...rest }) => {

  const { onChangeText, ...otherRestProps } = rest;
  return (
    <Controller 
    control={control}
    name={name}
    rules={rules}
    render={({field: {value, onChange, onBlur}, fieldState:{error}}) => (
      <>
      <Text style={styles.inputFieldLabel}>{label && label}</Text>
      <View style={styles.outerInputFieldContainer}>
      {leftIcon && <View style={styles.inputFieldLeftIcon}>{leftIcon}</View>}
    <View style={[styles.inputFieldContainer, {borderColor: error && COLORS.errorRed, borderWidth: 1}]}>
      <TextInput 
        style={[customStyles, styles.input]}
       {...rest}
       value={value}
       onBlur={onBlur}
       secureTextEntry={secureTextEntry}
       placeholder={placeholder}
       autoCapitalize={autoCapitalize}
       placeholderTextColor={COLORS.inputGrayText}
       onChangeText={(text) => {
        // Call the original onChangeText if it exists
        if (onChangeText) {
          onChangeText(text);
        }
        // Call the new input change handler
        if (onInputChange) {
          onInputChange();
        }
        // Call the react-hook-form onChange
        onChange(text);
      }}
      {...otherRestProps}
       />
       {rightIcon && <TouchableOpacity
        onPress={handlePassworsSecured}
        style={styles.inputFieldRightIcon}>
          {rightIcon}
          </TouchableOpacity>
          }
    </View>
    </View>
    {
      error && <NunitoText type='bold' customStyles={styles.errorText}>{error.message || 'Error'}</NunitoText>
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
    color: COLORS.errorRed,  
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