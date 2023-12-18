import { SafeAreaView, StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, ImageBackground, Modal, Image } from 'react-native'
import React, { useMemo, useRef, useState } from 'react'
import { ImagePickerExample } from '../components/ImagePicker'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { MainStackParams } from '../navigation/MainStackNavigator'
import { Entypo, AntDesign } from '@expo/vector-icons';
import { DemoModal } from '../components/DemoModal'
import { SubmitButton } from '../components/SubmitButton'
import { NunitoText } from '../components/NunitoText'
import { COLORS, SPACING } from '../../assets/theme'
import { OnBoardingContainer } from '../components/OnBoarding/OnBoardingContainer'
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useAuthContext } from '../contexts/AuthContext'
import Animated, {useSharedValue, useAnimatedStyle, withSpring} from 'react-native-reanimated'

const { width, height } = Dimensions.get('window');

type NavigationProps = NativeStackScreenProps<MainStackParams, 'DemoPreparationScreen'>

const DemoPreparationScreen: React.FC<NavigationProps> = ({navigation}) => {
  const [text, setText] = useState('Remember why you started. Every step brings you closer to your goals. Keep pushing forward!')
  const [image, setImage] = useState('')
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const confirmImageSelection = () => {
    setIsModalVisible(false);
    // Lógica adicional si es necesaria
  };

  const handleBottomSheetOpen = () => {
    setIsBottomSheetVisible(true);
    bottomSheetRef.current?.snapToIndex(0);
  };

  const handleBottomSheetClose = () => {
    setIsBottomSheetVisible(false);
  };
  
  const snapPoints = useMemo(() => ['30%', '50%'], [])

  const bottomSheetRef = useRef<BottomSheet>(null)

  const {signOutUser} = useAuthContext()

  const textInputRef = useRef<TextInput>(null);
  const scale = useSharedValue(1);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handleWriteMyOwn = () => {
    scale.value = withSpring(1.1, { damping: 2 }, () => {
      scale.value = withSpring(1);
    });
    setText('');
    textInputRef.current?.focus();
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
    <SafeAreaView style={styles.container}>
      <DemoModal />
      <OnBoardingContainer>
      {/* Fondo con la imagen seleccionada */}
      <ImageBackground 
        source={{ uri: image }} 
        style={styles.backgroundImage}
        blurRadius={5} // Agrega un leve desenfoque para resaltar el texto
      >
        {/* Área de texto */}
        <Animated.View style={animatedStyles}>
        <TextInput 
          ref={textInputRef}
          style={styles.textInput}
          value={text}
          multiline={true} 
          placeholder="Write here what you need to listen..." 
          onChangeText={(newText) => setText(newText)} 
          keyboardType='default'
        />
        </Animated.View>

        {/* Modal para confirmar la selección de la imagen */}
      <Modal
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <Image source={{ uri: selectedImage }} style={{ /* estilos de la imagen */ }} />
        <TouchableOpacity onPress={confirmImageSelection}>
          <Text>Confirmar</Text>
        </TouchableOpacity>
      </Modal>


        <View style={styles.submitButtonContainer}>
        <SubmitButton 
        onPress={handleWriteMyOwn}
        style={styles.button}><NunitoText customStyles={styles.buttonText} type='bold'>Write My Message</NunitoText></SubmitButton>
        </View>

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

        {/* Selector de imagen */}
         {/* <View style={styles.imagePickerContainer}>
          <ImagePickerExample img={image} setImg={setImage} />
          <Entypo name="camera" size={28} color='#555' />
        </View>  */}

        {/* Botón para continuar */}
        {/* <TouchableOpacity 
          style={styles.continueButton}
          onPress={() => image && navigation.navigate('DemoSettedScreen', {image, text})}
          >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity> */}
      </ImageBackground>
      </OnBoardingContainer>
    </SafeAreaView>
    {
      isBottomSheetVisible && (
      <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints}>
        <View style={styles.bottomSheetContentContainer}>
          <TouchableOpacity
           style={styles.bottomSheetCloseButton} 
           onPress={handleBottomSheetClose}>
          <AntDesign name="closecircleo" size={24} color={COLORS.blackSecondaryText} />
          </TouchableOpacity>
          <NunitoText customStyles={styles.bottomSheetContent}>If you're feeling a bit lost or just unsure what to write, visit our [Inspiration Section] to find famous quotes that might motivate you.
        </NunitoText>
        </View>
      </BottomSheet>)
    }
    </GestureHandlerRootView>
  )
}

export default DemoPreparationScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.indigoDye, 
    alignItems: 'stretch'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    width: width - 40,
    padding: 15,
    fontSize: 16,
    color: '#333333',
    backgroundColor: '#FFFFFFAA', // Semi-transparente
    textAlignVertical: 'top',
    minHeight: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignSelf: 'center',
    marginVertical: 20,
  },
  imagePickerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
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
  button:{
    
  }, 
  submitButtonContainer: {
  width: '50%', 
  marginBottom: 20
  }, 
  buttonText: {
    textAlign: 'center',
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
  }
});
