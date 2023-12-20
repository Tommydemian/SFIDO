import { StyleSheet, Text, View, Dimensions, TouchableOpacity, StatusBar } from 'react-native'
import React from 'react'
import { Data } from '../../../assets/constants/data'
import Animated, {useAnimatedStyle, interpolate, Extrapolation } from 'react-native-reanimated'
import { AbsoluteFillBgImage } from '../AbsoluteFillBgImage'
import { NunitoText } from '../NunitoText'
import { COLORS, SPACING } from '../../../assets/theme'
import { OnBoardingContainer } from './OnBoardingContainer'

type RenderItemProps = {
    item: Data;
    index: number;
    offSetX: Animated.SharedValue<number>;
}

const SCREEN_WIDTH = Dimensions.get('screen').width

// RenderItem component for rendering each onboarding item
export const OnBoardingRenderItem: React.FC<RenderItemProps> = ({item, index, offSetX}) => {

    // ANIMATED STYLES
    // Animated styles for image
    const imageAnimatedStyle = useAnimatedStyle(() => {
        // Interpolation for opacity and translateY based on scroll offset
        const opacityAnimation = interpolate(
        offSetX.value, 
        [
            (index - 1) * SCREEN_WIDTH, 
            index * SCREEN_WIDTH, 
            (index + 1) * SCREEN_WIDTH
        ], 
        [0,1,0], 
         Extrapolation.CLAMP,
        );
        // 
    const translateYAnimation = interpolate(
        offSetX.value, 
        [
            (index - 1) * SCREEN_WIDTH, 
            index * SCREEN_WIDTH, 
            (index + 1) * SCREEN_WIDTH
        ], 
        [100, 0, 100], 
        Extrapolation.CLAMP,
        )

        return {
            opacity: opacityAnimation,
            width: SCREEN_WIDTH * 0.5,
            height: SCREEN_WIDTH * 0.5, 
            transform: [{translateY: translateYAnimation}]

        }
    })

    // Animated styles for text
    const textAnimationStyle = useAnimatedStyle(() => {
        // Interpolation for opacity and translateY based on scroll offset
        const opacityAnimation = interpolate(
          offSetX.value,
          [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH,
          ],
          [0, 1, 0],
          Extrapolation.CLAMP,
        );
        const translateYAnimation = interpolate(
          offSetX.value,
          [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH,
          ],
          [100, 0, 100],
          Extrapolation.CLAMP,
        );
  
        return {
          opacity: opacityAnimation,
          transform: [{translateY: translateYAnimation}],
        };
      });
     
    return (
        <View style={[styles.itemContainer, {width: SCREEN_WIDTH}]}>         
            <AbsoluteFillBgImage imageKey='authbg'/>
          
            <StatusBar barStyle={'dark-content'}/>
            <Animated.Image 
            source={item.image}
            style={[imageAnimatedStyle]}
              />
              <Animated.View style={textAnimationStyle}>
            <NunitoText type='bold' customStyles={styles.itemTitle}>{item.title}</NunitoText>
            <NunitoText customStyles={styles.itemText}>{item.text}</NunitoText>
            </Animated.View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        justifyContent: 'center',
        rowGap: SPACING.spacing30,
        alignItems: 'center',
        backgroundColor: COLORS.indigoDye,
        paddingHorizontal: SPACING.spacing30
      },
      itemTitle: {
        color: COLORS.whiteText, 
        fontSize: 28, // Tamaño de fuente más grande
        textAlign: 'center',
        marginBottom: SPACING.spacing20, // Espaciado mayor
      },
      itemText: {
        color: COLORS.whiteText, 
        fontSize: 16, // Tamaño de fuente ligeramente mayor
        lineHeight: 24, // Aumenta el interlineado para mejorar la legibilidad
      },
})