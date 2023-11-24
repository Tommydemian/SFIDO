import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/contexts/AuthContext';
import { NavResolutionNavigator } from './src/navigation/NavResolution';
import { MessageProvider } from './src/contexts/MessageContext';

import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '292316984238-tr0vp1nj1fdo4t8pac63flfq2fs9hs5p.apps.googleusercontent.com', // From Google Cloud Platform
  // Other configuration options if needed
});


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