import { useContext } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { MainStackNavigator } from "./MainStackNavigator";
import { AuthStackNavigator } from "./AuthStackNavigator";


export const NavResolutionNavigator = () => {
    
    const { user } = useAuthContext();

    return (
        user.isLoggedIn ? <MainStackNavigator/> : <AuthStackNavigator />
    )
    
}