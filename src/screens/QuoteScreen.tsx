import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image } from 'react-native'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { MainStackParams } from '../navigation/MainStackNavigator'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Quote } from '../types';
import { COLORS } from '../../assets/theme';

type Props = NativeStackScreenProps<MainStackParams, 'QuoteScreen'>

export const QuoteScreen: React.FC<Props> = ({navigation}) => {
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState<number | undefined>(undefined)
    const [quote, setQuote] = useState<Quote>({
        author: '', 
        category_id: 0, 
        id: 0, 
        text: ''
    }) 

    useEffect(() => {
        const today = new Date().toLocaleDateString();
        const userUid = auth().currentUser?.uid;

        // clause guard
        if (!userUid) return; // Ensure there is a user ID

        firestore()
        .collection('users')
        .doc(userUid)
        .get()
        .then((doc) => {
            const docData = doc.data();
            if (docData?.lastQuoteUpdate !== today) {
                const newQuoteIndex = (docData?.quoteIndex || 0) + 1; // Increment quote index
                setCurrentQuoteIndex(newQuoteIndex);

                // Update Firestore document
            firestore().collection('users').doc(userUid).update({
                quoteIndex: newQuoteIndex,
                lastQuoteUpdate: today,
            })   
            } else {
                // If the quote is already updated today, use the current index
                setCurrentQuoteIndex(docData?.quoteIndex);
            }
        }).catch((err) => {
            console.log(err, 'document not found');
        });
        }, [])

    useEffect(() => {
        if (currentQuoteIndex === undefined) return;

        firestore()
        .collection('quotes')
        .where("id", "==", currentQuoteIndex)
        .get()
        .then((querySnapshot) => {
            if (!querySnapshot.empty) {
                const quoteData = querySnapshot.docs[0].data() as Quote;
                setQuote(quoteData);
            }
        }).catch((err) => {
            console.log(err);    
        })

        const timer = setTimeout(() => {
            navigation.navigate('WelcomeScreen');
        }, 10000);
    
        return () => clearTimeout(timer); // Clear timer on cleanup
    }, [currentQuoteIndex]) // react to first evaluation

    
    // function redirect
    const handleMoveOn = () => {
        navigation.navigate('WelcomeScreen')
    }
    
  return (
    <SafeAreaView style={styles.container}>
            {
                quote && (
                    <View style={styles.quoteContainer}>
                    <Text style={styles.quoteText}>{quote.text}</Text>
                    <Text style={styles.quoteAuthor}>{quote.author}</Text>
                    </View>
                )
            }
            <TouchableOpacity style={styles.linkContainer} onPress={handleMoveOn}>
            <Text style={styles.link}>Continue</Text>
            </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 20, 
        backgroundColor: COLORS.textBlack
    }, 
    quoteContainer: {
       // backgroundColor: COLORS.bgBlack,
    }, 
    linkContainer: {
        alignSelf: 'flex-end',
        backgroundColor: COLORS.blackBg,
        borderRadius: 30
    },
    link: {
        color: COLORS.whiteText,
        fontWeight: 'bold',
        padding: 20,
    },
    quoteText: {
        fontSize: 50, 
        fontWeight: 'bold',
        color: COLORS.whiteText, 
        textAlign: 'center', 
        paddingBottom: 10
    },
    quoteAuthor: {
        fontSize: 20, 
        fontWeight: 'bold',
        color: COLORS.inputGrayText, 
        textAlign: 'right'
    }
})