import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Data } from '../../../assets/constants/data'
import Animated, {useAnimatedStyle, interpolate, Extrapolate} from 'react-native-reanimated'
import { COLORS } from '../../../assets/theme'

type Props = {
  data: Data[];
  offSetX: Animated.SharedValue<number>;
  screenWidth: number;
}

type AnimatedDotsProps = {
  index: number;
  offSetX: Animated.SharedValue<number>;
  screenWidth: number;
} 

const AnimatedDot: React.FC<AnimatedDotsProps> = ({ index, offSetX, screenWidth }) => {
  const animatedDotStyle = useAnimatedStyle(() => {
    const widthAnimation = interpolate(
      offSetX.value,
      [(index - 1) * screenWidth, index * screenWidth, (index + 1) * screenWidth],
      [10, 20, 10],
      Extrapolate.CLAMP
    );
    const opacityAnimation = interpolate(
      offSetX.value,
      [(index - 1) * screenWidth, index * screenWidth, (index + 1) * screenWidth],
      [0.5, 1, 0.5], // Cambiado de [0.5, 10, 0.5] a [0.5, 1, 0.5]
      Extrapolate.CLAMP
    );
    return {
      width: widthAnimation,
      opacity: opacityAnimation
    };
  });

  return <Animated.View style={[styles.dots, animatedDotStyle]} />;
};

export const OnBoardingPagination: React.FC<Props> = ({ data, offSetX, screenWidth }) => {
  return (
    <View style={styles.paginationContainer}>
      {data.map((_, index) => (
        <AnimatedDot key={index} index={index} offSetX={offSetX} screenWidth={screenWidth} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row', 
    height: 40, 
    justifyContent: 'center',
    alignItems: 'center'
  }, 
  dots: {
    width: 10, 
    height: 10, 
    backgroundColor: COLORS.folly,
    marginHorizontal: 10, 
    borderRadius: 100
  }
})