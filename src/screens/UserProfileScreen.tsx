import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { UpperBarNav } from '../components/UpperBarNav'

export const UserProfileScreen = () => {

  return (
    <View>
      <UpperBarNav />
      <TouchableOpacity><Text>Send Notification</Text></TouchableOpacity>
      <Text>UserProfileScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({})