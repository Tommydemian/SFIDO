import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from '../../../assets/theme';
import { NunitoText } from '../NunitoText';
import Animated, {SharedValue, useAnimatedStyle, withSpring, withTiming} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

type Props = {
  flatListRef: React.RefObject<React.Component<{}, {}, any>>;
  flatListIndex: SharedValue<number>;
  dataLength: number;
}

export const OnBoardingNextButton: React.FC<Props> = ({dataLength, flatListIndex, flatListRef}) => {

  const navigation= useNavigation()

  const arrowAnimationStyle = useAnimatedStyle(() => {
    return {
      width: 30, 
      height: 30,
      opacity: flatListIndex.value === dataLength - 1 ? withTiming(0): withTiming(1), 
      transform: [
        {translateX: flatListIndex.value === dataLength - 1 
          ? withTiming(100)
          : withTiming(0), 
        }
      ]
    }
  })
  
  // Animated styles for button
  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: flatListIndex.value === dataLength - 1 ? withSpring(140) : withSpring(60),
      height: 60
    }
  })

  // const textAninationStyle = useAnimatedStyle(() => {
  //   return {
  //     opacity: flatListIndex.value === dataLength - 1 
  //     ? withTiming(1)
  //     : withTiming(0), 
  //     transform: [
  //       {translateX: flatListIndex.value === dataLength - 1 
  //         ? withTiming(0)
  //         : withTiming(-100), 
  //       }
  //     ]
  //   }
  // })

  const handlePress = () => {
    if (flatListIndex.value === dataLength - 1) {
      navigation.navigate('DemoStack')
    }    
  }
 
  return (
    <Pressable onPress={handlePress}>
      <Animated.View style={[styles.container, buttonAnimatedStyle]}>
        <NunitoText customStyles={[styles.buttonText]}>Get Started</NunitoText>
        <Animated.View style={[styles.arrowIcon, arrowAnimationStyle]}>
          <AntDesign name="arrowright" size={24} color={COLORS.whiteText} />
        </Animated.View>
      </Animated.View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: COLORS.folly,
      padding: 10, 
      borderRadius: 10, 
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden'
    }, 
    arrowIcon: {
      position: 'absolute',
    }, 
    buttonText: {
      fontSize: 16, 
      position: 'absolute',
    }
})