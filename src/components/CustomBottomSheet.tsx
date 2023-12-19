import React, {useMemo, forwardRef} from 'react'
import BottomSheet from '@gorhom/bottom-sheet';

type Props = {
    children: React.ReactNode
}

export const CustomBottomSheet = forwardRef<BottomSheet, Props>(({ children }, ref) => {

const snapPoints = useMemo(() => ['30%', '50%'], [])

  return (
    <BottomSheet
     ref={ref}
    snapPoints={snapPoints}>
        {children}
      </BottomSheet>
  )
})

