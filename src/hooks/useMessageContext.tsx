import { useContext } from "react"
import { MessageContext } from "../contexts/MessageContext"

export const useMessageContext = () => {
    const context = useContext(MessageContext)

    if (!context) {
        throw new Error('useContext must be used within a AuthProvider')
    }

    const {handleSendMessage, handleSentAndReceivedMessages, message, setMessage, receivedMessages, sentMessages} = context

    return {handleSendMessage, handleSentAndReceivedMessages, message, setMessage, receivedMessages, sentMessages}
}