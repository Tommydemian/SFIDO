import React, {useEffect, useRef, useState} from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { AuthProvider } from './src/contexts/AuthContext';
import { NavResolutionNavigator } from './src/navigation/NavResolution';
import { MessageProvider } from './src/contexts/MessageContext';
import * as Notifications from 'expo-notifications';
import {navigate, navigationRef} from './src/navigation/navigationRef'

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
    <AuthProvider>
      <MessageProvider>
    <NavigationContainer ref={navigationRef}>
      <NavResolutionNavigator />
    </NavigationContainer>
    </MessageProvider>
    </AuthProvider>
  );
}