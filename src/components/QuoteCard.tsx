import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../assets/theme';

type Props = {
    text: string;
    author: string;
}

export const QuoteCard: React.FC<Props> = ({text, author}) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.quoteText}>{text}</Text>
      <Text style={styles.quoteAuthor}>{author}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.silver, 
    marginVertical: 10, 
    borderRadius: 20, 
    padding: 10
  }, 
  quoteText: {
    color: COLORS.textBlack, 
    textAlign: 'center', 
    marginBottom: 10
  }, 
  quoteAuthor: {
    color: COLORS.textBlack, 
    textAlign: 'right', 
    fontWeight: 'bold',
    paddingRight: 10
  }
})
