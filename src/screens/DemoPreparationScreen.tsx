import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ImageBackground, Modal, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { MainStackParams } from '../navigation/MainStackNavigator'
import { Entypo, AntDesign } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Animated, {useSharedValue, useAnimatedStyle, withSpring} from 'react-native-reanimated'

import { ImagePickerExample } from '../components/ImagePicker'
import { DemoModal } from '../components/DemoModal'
import { SubmitButton } from '../components/SubmitButton'
import { NunitoText } from '../components/NunitoText'
import { OnBoardingContainer } from '../components/OnBoarding/OnBoardingContainer'
import { CustomBottomSheet } from '../components/CustomBottomSheet';
import { DemoTextInput } from '../components/DemoTextInput';
import {DemoImageModal} from '../components/DemoImageModal';

import { useAuthContext } from '../contexts/AuthContext'
import { useBottomSheet } from '../hooks/useBottomSheet';

import { COLORS, SPACING } from '../../assets/theme'
import { useDemoTextInput } from '../hooks/useDemoTextInput';

type NavigationProps = NativeStackScreenProps<MainStackParams, 'DemoPreparationScreen'>

export const DemoPreparationScreen: React.FC<NavigationProps> = ({navigation}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState('')
  const [modalSelectedImage, setModalSelectedImage] = useState('')

  const handleModalSelectedImage = (selectedImage: string) => {
    setModalSelectedImage(selectedImage)
    setIsModalVisible(false)
  }

    // Llamado cuando se selecciona una imagen
    const handleImageSelected = (uri: string) => {
        setSelectedImage(uri);
        setIsModalVisible(true); // Abre el modal
    };

  // hooks
  const {handleBottomSheetClose, handleBottomSheetOpen, isBottomSheetVisible, bottomSheetRef} = useBottomSheet()

  const {handleWriteMyOwn} = useDemoTextInput()

  const {signOutUser} = useAuthContext()

  return (
    <GestureHandlerRootView style={{flex: 1}}>
    <SafeAreaView style={styles.container}>
      <DemoModal />

      <OnBoardingContainer>

        <DemoTextInput 
        placeholder='Write what you need to listen...' 
        render={({handleWriteMyOwn}) => (
          <View style={styles.actionsContainer}>
        <View style={styles.submitButtonContainer}>
        <SubmitButton 
        onPress={handleWriteMyOwn}
        style={styles.button}><NunitoText customStyles={styles.buttonText} type='bold'>Write My Message</NunitoText></SubmitButton>
        </View>

        {/* Selector de imagen */}
        <View style={styles.imagePickerContainer}>
          <ImagePickerExample img={selectedImage} setImg={handleImageSelected} />
        </View> 
        </View> 
        )}
        />
         
        {/* Image modal */}
        <DemoImageModal selectedImage={selectedImage} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}
        handleModalSelectedImage={handleModalSelectedImage}
        />

        <TouchableOpacity onPress={signOutUser}><Text>Sign out</Text></TouchableOpacity>

        <View style={styles.needInspTextContainer}>
        <NunitoText type='bold' customStyles={styles.needInspText}>Need some inspiration?</NunitoText>
        <AntDesign 
        name="infocirlce"
        size={24} 
        color={COLORS.whiteText}
        onPress={handleBottomSheetOpen}
        />
        </View>

        <View style={styles.modalSelectedImageContainer}>
        <Image 
        source={{uri: modalSelectedImage}} 
        style={styles.modalselectedImage}
        />
        </View>

      </OnBoardingContainer>
    </SafeAreaView>

    {
      isBottomSheetVisible && (
      <CustomBottomSheet ref={bottomSheetRef}>
        <View style={styles.bottomSheetContentContainer}>
          <TouchableOpacity
           style={styles.bottomSheetCloseButton} 
           onPress={handleBottomSheetClose}>
          <AntDesign name="closecircleo" size={24} color={COLORS.blackSecondaryText} />
          </TouchableOpacity>
          <NunitoText customStyles={styles.bottomSheetContent}>If you're feeling a bit lost or just unsure what to write, visit our [Inspiration Section] to find famous quotes that might motivate you.
        </NunitoText>
        </View>
      </CustomBottomSheet>)
    }
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.whiteText, 
  },
  imagePickerContainer: {
    alignSelf: 'flex-start'
  },
  continueButton: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    padding: 10,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 18,
  },
  needInspText: {
  }, 
  needInspTextContainer: {
    flexDirection: 'row', 
    margin: 10,
    columnGap: SPACING.spacing10 
  },
  bottomSheetContent: {
    color: COLORS.blackSecondaryText, 
    fontSize: 18
  }, 
  bottomSheetContentContainer: {
    padding: SPACING.spacing20
  }, 
  bottomSheetCloseButton: {
    alignSelf: 'flex-end', 
    margin: SPACING.spacing10
  }, 
  submitButtonContainer: {
  width: '50%', 
  marginBottom: 20
  }, 
  buttonText: {
    textAlign: 'center',
  },
  previewImage: {
    width: '100%',
    height: '80%', // Ajusta según sea necesario
    resizeMode: 'contain',
},
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }, 
  modalSelectedImageContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalselectedImage: {
    height: 300, 
    width: 300, 
    elevation: 5,
    borderRadius: SPACING.spacing10

  }
});
