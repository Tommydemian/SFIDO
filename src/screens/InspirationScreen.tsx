import { StyleSheet, SafeAreaView, FlatList, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import { getQuotesFromFirestore } from '../services/quoteService'
import { Quote } from '../types'
import Spinner from 'react-native-loading-spinner-overlay'
import { QuoteCard } from '../components/QuoteCard'

const forestImg = require('../../assets/images/forest.jpg')

export const InspirationScreen = () => {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getQuotesFromFirestore()
    .then((res) => {
      const quotesList = res.docs.map(doc => doc.data() as Quote)
      setQuotes(quotesList)
    }).catch((err) => {
      console.log(err);      
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  // loading return
  if (loading) {
    return <Spinner />;
  }
   
  // TODO: lazy lodad quotes => check FlashList package
  return (
    <SafeAreaView style={styles.container}>

    <Image source={forestImg} style={styles.image} />

      <FlatList 
      data={quotes}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item}) => <QuoteCard text={item.text} author={item.author} />}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingHorizontal: 10
  },
  image: {
    height: 300,
    alignSelf: 'center',
    aspectRatio: 16/9,
    
  }
})