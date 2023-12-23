import React from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { AuthStackNavigator } from './AuthStackNavigator';
import { MainStackNavigator } from './MainStackNavigator';

export const NavResolutionNavigator = () => {
  const { user } = useAuthContext();

  return user.isLoggedIn ? <MainStackNavigator /> : <AuthStackNavigator />;
};
