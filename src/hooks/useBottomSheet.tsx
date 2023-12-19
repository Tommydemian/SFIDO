import {useRef, useState} from 'react'
import BottomSheet from '@gorhom/bottom-sheet';

export const useBottomSheet = () => {
const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
const bottomSheetRef = useRef<BottomSheet>(null)

    const handleBottomSheetOpen = () => {
        setIsBottomSheetVisible(true);
        bottomSheetRef.current?.snapToIndex(0);
      };
    
      const handleBottomSheetClose = () => {
        setIsBottomSheetVisible(false);
      };

  return {isBottomSheetVisible, handleBottomSheetClose, handleBottomSheetOpen, bottomSheetRef}
}

