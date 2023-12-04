import { SafeAreaView, StyleSheet, Text, View, FlatList } from 'react-native'
import React, {useState} from 'react'
import Animated from 'react-native-reanimated';
import { Quote } from '../types';
import { RenderItem } from '../components/RenderItem';

type Props = {}

export const OnBoardingScreen = () => {

    const [list, setList] = useState<Quote[]>([])

  return (
    <SafeAreaView>
        <Text>Whatever</Text>
        <Animated.FlatList
        data={list}
        renderItem={({item, index}) => {
            return <RenderItem item={item} index={index}/>
        }}
        keyExtractor={(item) => item.id.toString()}
        scrollEventThrottle={16}
        horizontal={true}
        bounces={false}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false} 
        />
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})