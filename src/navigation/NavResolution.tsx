import { useAuthContext } from "../hooks/useAuthContext";
import { AuthStackNavigator } from "./AuthStackNavigator";
import { MainStackNavigator } from "./MainStackNavigator";
import { RootStackNavigator } from "./RootStackNavigator";


export const NavResolutionNavigator = () => {
    
    const { user } = useAuthContext();

    return (
        user.isLoggedIn ? <MainStackNavigator/> : <AuthStackNavigator />
    )
    
}