import { StyleSheet, View, Image } from 'react-native'
import React from 'react'

const authbg = require('../../assets/images/authbg.png');

export const AbsoluteFillBgImage = () => {
  return (
    <View style={StyleSheet.absoluteFill}>
      <Image source={authbg} style={{flex: 1}} />
    </View>
  )
}
