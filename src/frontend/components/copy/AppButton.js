import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import Colors from '~/utils/colors';
import colors from '../../utils/colors';

export default function AppButton({ title, onPress, color = 'primary' }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: Colors[color] }]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 10, 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth:2,
    borderColor: colors.primary,
    backgroundColor:'#1c7085',
    padding: 15,
    width: '100%'
  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600',
    textTransform: 'uppercase'
  }
});
