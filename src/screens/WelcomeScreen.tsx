import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS } from '../../assets/theme';

import {NativeStackScreenProps} from '@react-navigation/native-stack'
import { MainStackParams } from '../navigation/MainStackNavigator';

type Props = NativeStackScreenProps<MainStackParams, 'WelcomeScreen'>

export const WelcomeScreen: React.FC<Props> = ({navigation}) => {

    const handleMoveOn = () => {
        console.log('hola');
        
        navigation.navigate('InterestSelectionScreen')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome Beasts</Text>
            <Text style={styles.subtitle}>
                Let's establish something:{"\n"}
                <Text style={styles.highlight}>Everybody wants to be a beast until it's time to do what beasts do.</Text>
            </Text>

            <Image source={require('../../assets/images/dobermanbark.jpeg')} style={styles.image} />

            <Text style={styles.description}>
            A beast is not defined by words, but by actions. In this space, we refuse to live in obscurity. We challenge stress, anxiety, and the ordinary. Here, we are more than just motivated—we are relentless in our pursuits.
            </Text> 
            <Text style={styles.description}>
            This is a sanctuary for those who are tired of the lone hunt. Connect, share, and grow. Forge alliances, propose ideas, and build your legacy. No middlemen, just raw, unfiltered ambition.
            </Text>

            <TouchableOpacity style={styles.ctaButton} onPress={handleMoveOn}>
            <Text style={styles.ctaButtonText}>Move On</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.blackBg,
        padding: 20,
        justifyContent: 'center'
    },
    title: {
        fontSize: 24,
        color: COLORS.whiteText,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: COLORS.silver,
        textAlign: 'center',
        marginBottom: 20,
    },
    highlight: {
        color: COLORS.orangeWeb,
        fontWeight: 'bold',
    },
    image: {
        width: '100%',
        height: 200, // Ajusta según sea necesario
        marginBottom: 20,
        borderRadius: 20
    },
    description: {
        fontSize: 16,
        color: COLORS.whiteTextTwo,
        marginBottom: 10,
    },
    ctaButton: {
        backgroundColor: COLORS.orangeWeb,
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 20,
    },
    ctaButtonText: {
        color: COLORS.whiteText,
        fontWeight: 'bold',
        fontSize: 18,
    },
});


