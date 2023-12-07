import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { COLORS } from '../../assets/theme';

type Props = {
    children: React.ReactNode;
    customStyles?: object;
    type?: 'regular' | 'semiBold' | 'bold';
    onPress?: () => void;
}

export const NunitoText: React.FC<Props> = ({ onPress, children, customStyles, type = 'regular' }) => {
    const [fontsLoaded] = useFonts({
        NunitoRegular: require('../../assets/fonts/Nunito-Regular.ttf'),
        NunitoSemiBold: require('../../assets/fonts/Nunito-SemiBold.ttf'),
        NunitoBold: require('../../assets/fonts/Nunito-Bold.ttf')
    });

    if (!fontsLoaded) {
        return null;
    }

    const fontStyles = fontTypeStyles[type] || fontTypeStyles.regular;

    return (
        <Text onPress={onPress} style={[fontStyles, styles.default, customStyles]}>
            {children}
        </Text>
    );
};

const fontTypeStyles = {
    regular: {
        fontFamily: 'NunitoRegular',
    },
    semiBold: {
        fontFamily: 'NunitoSemiBold',
    },
    bold: {
        fontFamily: 'NunitoBold',
    },
};

const styles = StyleSheet.create({
    default: {
        color: COLORS.whiteText
    }
})