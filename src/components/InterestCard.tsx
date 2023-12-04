import { StyleSheet, Text, Pressable, PressableProps } from 'react-native'
import React from 'react'
import { COLORS } from '../../assets/theme'

type Props = PressableProps & {
    title: string
    description: string;
    isSelected: boolean
}

export const InterestCard: React.FC<Props> = ({title, description, isSelected, ...rest}) => {
  return (
    <Pressable  {...rest} style={[styles.cardContainer, isSelected && styles.selected]}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: COLORS.whiteText, // Fondo claro para contraste
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // Para Android
        padding: 15,
        marginBottom: 10,
    }, 
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textBlack, // Texto oscuro para contraste
        marginBottom: 5,
    },
    cardDescription: {
        fontSize: 14,
        color: COLORS.blackBg, // Texto gris para descripción
    }, 
    selected: {
        backgroundColor: COLORS.bluegreen, // Cambia el color de fondo para resaltar
        borderWidth: 2, // Borde más grueso
        borderColor: COLORS.orangeWeb, // Color del borde
        shadowColor: COLORS.orangeWeb, // Sombra con un color que resalte
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 6, // Elevación para Android
    }
})