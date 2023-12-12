import { useCallback, useState } from "react"
import { FirebaseAuthTypes } from '@react-native-firebase/auth'

import { useAuthContext } from "./useAuthContext"
import { setIsGoogleAccountLinkedToTrue } from "../services/userService"
import { useDialogVisibility } from "./useDialogVisibility"

type DraftUserCredentials = FirebaseAuthTypes.UserCredential & {
    email: string;
    googleCredential: FirebaseAuthTypes.AuthCredential;
  }

export const useGoogleAuthentication = () => {
    const [email, setEmail] = useState('')
    const [googleCredential, setGoogleCredential] = useState<FirebaseAuthTypes.AuthCredential | null>(null)

    // both googleFunctions from AuthContext
    const {onGoogleButtonPress, isGoogleLinked } = useAuthContext()
    
    const {setIsVisible} = useDialogVisibility()

    const handleOnGoogleButtonPress = useCallback(() => {
        onGoogleButtonPress()
        .then((res) => {
          const response = res as DraftUserCredentials
            if (!isGoogleLinked) { // need persistance here
              setIsVisible(true)
              setEmail(response.email)
              setGoogleCredential(response.googleCredential)
              setIsGoogleAccountLinkedToTrue(response.email)
              console.log(res, 'message'); 
            } else {
              'Account linked'
            }
          })
        }, [])
    
          return { handleOnGoogleButtonPress }
}