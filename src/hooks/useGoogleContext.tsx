import { useContext } from "react"
import { GoogleContext } from "../contexts/GoogleContext"

export const useGoogleContext = () => {
    const context = useContext(GoogleContext)

    if (!context) {
        throw new Error('useContext must be used within a AuthProvider')
    }

    const {onGoogleButtonPress, linkGoogleAccount, isGoogleLinked} = context

    return {onGoogleButtonPress, linkGoogleAccount, isGoogleLinked}
}