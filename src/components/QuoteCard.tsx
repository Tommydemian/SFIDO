import { StyleSheet, Text, View, Dimensions, ViewProps } from 'react-native';
import React from 'react';
import { COLORS } from '../../assets/theme';

type Props = ViewProps & {
  text: string;
  author: string;
  customStyles?: object;
};

const deviceWidth: number = Dimensions.get('screen').width;

export const QuoteCard: React.FC<Props> = ({ text, author, customStyles }) => {
  return (
    <View style={[styles.cardContainer, customStyles]}>
      <Text style={styles.quoteText}>{text}</Text>
      <Text style={styles.quoteAuthor}>{author}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.silver,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 20,
    padding: 10,
    width: deviceWidth * 0.7,
  },
  quoteText: {
    color: COLORS.textBlack,
    marginBottom: 10,
    paddingLeft: 5,
  },
  quoteAuthor: {
    color: COLORS.textBlack,
    textAlign: 'right',
    fontWeight: 'bold',
    paddingRight: 10,
  },
});
