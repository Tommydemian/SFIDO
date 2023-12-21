import React, {useEffect, useRef, useState} from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { AuthProvider } from './src/contexts/AuthContext';
import { GoogleProvider } from './src/contexts/GoogleContext'; // Importa GoogleProvider
import { NavResolutionNavigator } from './src/navigation/NavResolution';
import * as Notifications from 'expo-notifications';
import {navigate, navigationRef} from './src/navigation/navigationRef'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

GoogleSignin.configure({
  webClientId: process.env.GOOGLE_WEB_CLIENT_ID,
})

export default function App() {

  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification, 'NOTIFICATION');
    });
      
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      navigate('MotivationalMessageScreen')
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current!);
      Notifications.removeNotificationSubscription(responseListener.current!);
    };
  }, []);

  return (
    <GoogleProvider> 
    <AuthProvider>
        <NavigationContainer ref={navigationRef}>
          <NavResolutionNavigator />
        </NavigationContainer>
    </AuthProvider>
  </GoogleProvider>
  );
}