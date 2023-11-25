import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/contexts/AuthContext';
import { NavResolutionNavigator } from './src/navigation/NavResolution';
import { MessageProvider } from './src/contexts/MessageContext';

export default function App() {
  return (
    <AuthProvider>
      <MessageProvider>
    <NavigationContainer>
      <NavResolutionNavigator />
    </NavigationContainer>
    </MessageProvider>
    </AuthProvider>
  );
}