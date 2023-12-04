import { SafeAreaView, StyleSheet, Text, View, FlatList } from 'react-native'
import React, {useState} from 'react'
import Animated from 'react-native-reanimated';
import { Quote } from '../types';

type Props = {}

export const OnBoardingScreen = () => {

    const [list, setList] = useState<Quote>([])

  return (
    <SafeAreaView>
        <Text>Whatever</Text>
        <Animated.FlatList
        data={list}
        renderItem={({item, index}) => {
            return <RenderItem/>
        }}
        keyExtractor={item => item.id}
        />
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})