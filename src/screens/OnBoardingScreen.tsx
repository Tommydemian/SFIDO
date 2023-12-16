import { StyleSheet, Text, View, SafeAreaView, FlatList, Dimensions, ViewToken } from 'react-native'
import React, { useEffect, useCallback } from 'react'
import { data } from '../../assets/constants/data'
import { OnBoardingPagination } from '../components/OnBoarding/onBoardingPagination'
import { OnBoardingNextButton } from '../components/OnBoarding/OnBoardingNextButton'
import { OnBoardingRenderItem } from '../components/OnBoarding/OnBoardingRenderItem'
import Animated, {
    useSharedValue, 
    useAnimatedScrollHandler, 
    useAnimatedRef, 
} from 'react-native-reanimated'


type onViewableItemsChangedType = {
    viewableItems: ViewToken[];
  changed: ViewToken[];
};

const SCREEN_WIDTH = Dimensions.get('screen').width

export const OnBoardingScreen = () => {
    // Shared values for animation
    const offSetX = useSharedValue(0);
    const flatListIndex = useSharedValue(0)

    // Scroll handler for updating offSetX
    const handleScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
        offSetX.value = event.contentOffset.x;
    },
});

 // Handler for onViewableItemsChanged event
 const onViewableItemsChanged = useCallback(({ viewableItems }: onViewableItemsChangedType) => {
  flatListIndex.value = viewableItems[0]?.index ?? 0;
}, []);

    // Ref for the flat list
    const flatListRef = useAnimatedRef();


  return (
    <SafeAreaView style={styles.container}>
        <Animated.FlatList
        ref={flatListRef}
        data={data}
        renderItem={({ item, index }) => <OnBoardingRenderItem item={item} index={index} offSetX={offSetX} />}
        keyExtractor={item => item.id.toString()}
        scrollEventThrottle={16}
        horizontal={true}
        onScroll={handleScroll}
        bounces={false}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        />
        <View style={styles.bottomContainer}>
        <OnBoardingPagination 
        data={data}
        offSetX={offSetX}
        screenWidth={SCREEN_WIDTH} 
        />
        <OnBoardingNextButton
        flatListRef={flatListRef}
        flatListIndex={flatListIndex}
        dataLength={data.length}
        />
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },     
      bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', 
        marginHorizontal: 20, 
        marginVertical: 20
      }
})