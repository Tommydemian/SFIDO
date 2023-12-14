import { StyleSheet, Text, Pressable, PressableProps, View } from 'react-native'
import React, {useState} from 'react'
import { COLORS, SPACING } from '../../assets/theme'
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated'
import { AntDesign } from '@expo/vector-icons';
import { Categorie } from '../types';
import { NunitoText } from './NunitoText';

type Props = PressableProps & {
    title: string
    description: string;
    isSelected: boolean;
    expanded: boolean;
    onIconPress: (interestId: number) => void
    onExpandPress: (card: Categorie) => void
    children: React.ReactNode
}

export const CategorieCard: React.FC<Props> = ({ title, onExpandPress, onIconPress, children, expanded, description, isSelected, ...rest}) => {

    const animatedStyle = useAnimatedStyle(() => {
        return {
            height: expanded ? withTiming(90) : withTiming(0), 
            opacity: expanded ? withTiming(1) : withTiming(0),
        };
    });

  return (    
    <Pressable style={[styles.cardContainer, isSelected && styles.selected]} {...rest}>
      <View style={styles.headerContainer}>
      <NunitoText customStyles={styles.cardTitle}>{title}</NunitoText>
      <View style={styles.headerIconsContainer}>
      {children}
      {
        expanded ? (
            <AntDesign onPress={onExpandPress} name="up" size={15} color="black" />
            
            ) :
            <AntDesign onPress={onExpandPress} name="down" size={15} color="black" />

      }
      </View>
      </View>
      <Animated.View style={[styles.cardDescription, animatedStyle]}>
                <NunitoText customStyles={styles.cardDescription}>{description}</NunitoText>
                {expanded && (
                  <AntDesign onPress={onIconPress} style={{alignSelf: 'flex-end'}} name="checkcircle" size={30} color={isSelected? COLORS.successGreen : COLORS.grayText} />
                )}
      </Animated.View>
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
    headerIconsContainer: {
        flexDirection: 'row', 
        gap: SPACING.spacing10
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.blackSecondaryText, // Texto oscuro para contraste
        marginBottom: 5,
    },
    cardDescription: {
        fontSize: 14,
        color: COLORS.blackBg, // Texto gris para descripción
        overflow: 'hidden', 
    }, 
    selected: {
        backgroundColor: COLORS.nianza, // Cambia el color de fondo para resaltar
        borderWidth: 1, // Borde más grueso
        borderColor: COLORS.successGreen, // Color del borde
        shadowColor: COLORS.successGreen, // Sombra con un color que resalte
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 6, // Elevación para Android
    },
    headerContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 5
    }, 
    container: {
        height: 'auto'
    }
})