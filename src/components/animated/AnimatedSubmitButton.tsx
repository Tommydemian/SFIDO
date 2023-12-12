import { Pressable, PressableProps, Text, StyleSheet } from "react-native"
import { BORDER, COLORS } from "../../../assets/theme"
import Animated, {AnimatableValue, useAnimatedStyle, SharedValue} from "react-native-reanimated"
import { NunitoText } from "../NunitoText";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = PressableProps & {
    customStyles?: object
    children: React.ReactNode
    opacity: SharedValue<number> 
    transition: Readonly<Animated.SharedValue<AnimatableValue>>
}

export const AnimatedSubmitButton: React.FC<Props> = ({opacity, transition, customStyles,children, ...rest}) => {
  
    const animatedStyle = useAnimatedStyle(() => {
        return {
          opacity: opacity.value,
        };
      });
  
  return (
    <AnimatedPressable 
    {...rest}
    style={[styles.submitButton, customStyles, animatedStyle]}
    >
        <NunitoText customStyles={styles.submitText}>{children}</NunitoText>
    </AnimatedPressable>
    )
}

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: COLORS.black, 
    paddingVertical: 15, 
    borderRadius: BORDER.buttons,
    marginVertical: 10, 
    // paddingHorizontal: 10, 
    // marginBottom: 20
  }, 
  submitText: {
    color: COLORS.whiteText, 
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center', 
    textTransform: 'capitalize',
  }
})