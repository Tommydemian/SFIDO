import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { categoryIcons } from '../../assets/constants/data'
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from '../../assets/theme';

type Props = {
  title: string
}

export const CategorieCardIcon: React.FC<Props> = ({title}) => {
  // map object
  const iconName = categoryIcons[title] ? categoryIcons[title] : "tree";

 return (<FontAwesome name={iconName} size={20} color={COLORS.folly} />)  
}
