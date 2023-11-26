import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useContext must be used within a AuthProvider')
    }

    const {user, handleForgotPassword, handleSignup, handleSignIn, setUser, signOutUser, onGoogleButtonPress} = context

    return {user, handleForgotPassword, handleSignup, handleSignIn, setUser, signOutUser, onGoogleButtonPress}
}