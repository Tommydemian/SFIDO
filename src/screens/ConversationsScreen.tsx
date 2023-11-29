import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { UpperBarNav } from '../components/UpperBarNav'
import { useRef, useEffect } from 'react'
import * as Notifications from 'expo-notifications';

import { requestPermissions, scheduleNotifications } from '../services/notificationsService'

// ALWAYS ON APP.TSX ??? 
export const ConversationsScreen = () => {
  return (
    <View>
      <UpperBarNav />
      <TouchableOpacity onPress={requestPermissions}><Text>Request Permission</Text></TouchableOpacity>
      <TouchableOpacity onPress={scheduleNotifications}><Text>Send Notification</Text></TouchableOpacity>
      <Text>ConversationsScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({})