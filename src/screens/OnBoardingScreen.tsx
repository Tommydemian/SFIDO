import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, StatusBar, Image, Dimensions, ViewToken } from 'react-native'
import React, { useEffect, useCallback } from 'react'
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
import { useAuthContext } from '../hooks/useAuthContext'

const authbg = require('../../assets/images/authbg.png')

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

// RenderItem component for rendering each onboarding item
const RenderItem: React.FC<RenderItemProps> = ({item, index, offSetX}) => {
    console.log("RenderItem:", item, "Index:", index);

    const {signOutUser} = useAuthContext()
    
    // const {width: SCREEN_WIDTH} = useWindowDimensions()

    // ANIMATED STYLES
    // Animated styles for image
    const imageAnimatedStyle = useAnimatedStyle(() => {
        // Interpolation for opacity and translateY based on scroll offset
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
            // width: SCREEN_WIDTH * 0.8,
            // height: SCREEN_WIDTH * 0.8, 
            transform: [{translateY: translateYAnimation}]

        }
    })

    // Animated styles for text
    const textAnimationStyle = useAnimatedStyle(() => {
        // Interpolation for opacity and translateY based on scroll offset
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
          <View style={StyleSheet.absoluteFill}>
        <Image source={authbg} style={{flex: 1}} />
        </View>
            <StatusBar barStyle={'light-content'}/>
            <Animated.Image 
            source={item.image}
            style={[imageAnimatedStyle]}
              />
              <Animated.View style={textAnimationStyle}>
            <NunitoText type='bold' customStyles={styles.itemTitle}>{item.title}</NunitoText>
            <NunitoText customStyles={styles.itemText}>{item.text}</NunitoText>
            <TouchableOpacity onPress={signOutUser}><Text>Sign out</Text></TouchableOpacity>
            </Animated.View>
        </View>
    )
}

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
        backgroundColor: COLORS.indigoDye,
      },
      image: {
        width: 100, // ajusta según sea necesario
        height: 100, // ajusta según sea necesario
      },
      itemTitle: {
        color: COLORS.whiteText, 
        fontSize: 22, 
        textAlign: 'center',
        marginBottom: 10
      },
      itemText: {
        color: COLORS.whiteText, 
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