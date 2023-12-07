import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../../assets/theme';
import { NunitoText } from './NunitoText';

type Props = {
  navigationText: string;
  actionText: string;
  onActionPress: () => void;
};

// TODO: add transition to Sign In

export const AuthSwitchLink: React.FC<Props> = ({ navigationText, actionText, onActionPress }) => {
  return (
    <View style={styles.container}>
      <NunitoText customStyles={styles.navigationText}>{navigationText}</NunitoText>
      <TouchableOpacity onPress={onActionPress}>
        <NunitoText type='bold' customStyles={styles.actionText}>{actionText}</NunitoText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: SPACING.spacing20
    // otros estilos necesarios
  },
  navigationText: {
    color: COLORS.whiteText
  },
  actionText: {
    color: COLORS.whiteText,
    // otros estilos para el texto de acción
  },
});
