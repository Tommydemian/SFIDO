import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/contexts/AuthContext';
import { NavResolutionNavigator } from './src/navigation/NavResolution';

export default function App() {
  return (
    <AuthProvider>
    <NavigationContainer>
      <NavResolutionNavigator />
    </NavigationContainer>
    </AuthProvider>
  );
}