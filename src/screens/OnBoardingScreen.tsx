import { StyleSheet, Text, View, SafeAreaView, FlatList, StatusBar, Image, Dimensions, ViewToken } from 'react-native'
import React, { useEffect } from 'react'
import { data, Data } from '../../assets/constants/data'
import { COLORS } from '../../assets/theme'
import { NunitoText } from '../components/NunitoText'
import { OnBoardingPagination } from '../components/onBoardingPagination'
import { OnBoardingNextButton } from '../components/OnBoardingNextButton'
import Animated, {
    useSharedValue, 
    useAnimatedScrollHandler, 
    useAnimatedRef, 
    useAnimatedStyle, 
    interpolate, 
    Extrapolation
} from 'react-native-reanimated'

type onViewableItemsChangedType = {
    viewableItems: ViewToken[];
    changed: ViewToken[];
};

type RenderItemProps = {
    item: Data;
    index: number;
    offSetX: Animated.SharedValue<number>;
}


const SCREEN_WIDTH = Dimensions.get('screen').width

const RenderItem: React.FC<RenderItemProps> = ({item, index, offSetX}) => {
    console.log("RenderItem:", item, "Index:", index);

    
    // const {width: SCREEN_WIDTH} = useWindowDimensions()

    // Animated styles
    const imageAnimatedStyle = useAnimatedStyle(() => {
        const opacityAnimation = interpolate(
        offSetX.value, 
        [
            (index - 1) * SCREEN_WIDTH, 
            index * SCREEN_WIDTH, 
            (index + 1) * SCREEN_WIDTH
        ], 
        [0,1,0], 
         Extrapolation.CLAMP,
        );
        // 
    const translateYAnimation = interpolate(
        offSetX.value, 
        [
            (index - 1) * SCREEN_WIDTH, 
            index * SCREEN_WIDTH, 
            (index + 1) * SCREEN_WIDTH
        ], 
        [100, 0, 100], 
        Extrapolation.CLAMP,
        )

        return {
            opacity: opacityAnimation,
            width: SCREEN_WIDTH * 0.8,
            height: SCREEN_WIDTH * 0.8, 
            transform: [{translateY: translateYAnimation}]

        }
    })
    const textAnimationStyle = useAnimatedStyle(() => {
        const opacityAnimation = interpolate(
          offSetX.value,
          [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH,
          ],
          [0, 1, 0],
          Extrapolation.CLAMP,
        );
        const translateYAnimation = interpolate(
          offSetX.value,
          [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH,
          ],
          [100, 0, 100],
          Extrapolation.CLAMP,
        );
  
        return {
          opacity: opacityAnimation,
          transform: [{translateY: translateYAnimation}],
        };
      });
    
    return (
        <View style={[styles.itemContainer, {width: SCREEN_WIDTH}]}>
            <StatusBar barStyle={'light-content'}/>
            <Animated.Image 
            source={item.image}
            style={[imageAnimatedStyle]}
              />
              <Animated.View style={textAnimationStyle}>
            <NunitoText type='bold' customStyles={styles.itemTitle}>{item.title}</NunitoText>
            <NunitoText customStyles={styles.itemText}>{item.text}</NunitoText>
            </Animated.View>
        </View>
    )
}

export const OnBoardingScreen = () => {
    const offSetX = useSharedValue(0);
    const flatListIndex = useSharedValue(0)

const handleScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
        offSetX.value = event.contentOffset.x;
    },
});

const onViewableItemsChanged = ({ viewableItems }: onViewableItemsChangedType) => {
    flatListIndex.value = viewableItems[0]?.index ?? 0;
}

    const flatListRef = useAnimatedRef();


  return (
    <SafeAreaView style={styles.container}>
        <Animated.FlatList
        ref={flatListRef}
        data={data}
        renderItem={({ item, index }) => <RenderItem item={item} index={index} offSetX={offSetX} />}
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
    itemContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: COLORS.folly,
      },
      image: {
        width: 100, // ajusta según sea necesario
        height: 100, // ajusta según sea necesario
      },
      itemTitle: {
        color: COLORS.blackSecondaryText, 
        fontSize: 22, 
        textAlign: 'center',
        marginBottom: 10
      },
      itemText: {
        color: COLORS.blackSecondaryText, 
        textAlign: 'center',
        lineHeight: 20, 
        marginHorizontal: 35
      }, 
      bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', 
        marginHorizontal: 20, 
        marginVertical: 20
      }
})