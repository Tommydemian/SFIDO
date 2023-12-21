import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import React from 'react'

import { COLORS, SPACING } from '../../../assets/theme'

type Props = TouchableOpacityProps & { 
    children: React.ReactNode;
    customStyles?: object;
}

export const DemoIconButton: React.FC<Props> = ({children, customStyles, ...rest}) => {
  return (
    <TouchableOpacity {...rest} style={[styles.iconButton, customStyles]}>
            {children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    iconButton: {
        borderRadius: 100,
        backgroundColor: COLORS.folly, // O el color que prefieras
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.spacing10,
        padding: SPACING.spacing10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
})