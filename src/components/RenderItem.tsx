import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Props = {
    item: string
    index: number
}

export const RenderItem: React.FC<Props> = ({index, item}) => {
  return (
    <View>
      <Text>RenderItem</Text>
    </View>
  )
}

const styles = StyleSheet.create({})