import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useContext must be used within a AuthProvider')
    }

    const {user, handleForgotPassword, errorMessageState, setErrorMessageState, handleSignup, handleSignIn, setUser, signOutUser, onGoogleButtonPress, linkGoogleAccount, isGoogleLinked} = context

    return {user, handleForgotPassword, errorMessageState, setErrorMessageState, handleSignup, handleSignIn, setUser, signOutUser, onGoogleButtonPress, linkGoogleAccount, isGoogleLinked}
}