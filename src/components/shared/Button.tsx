import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Platform, ViewStyle, TextStyle } from 'react-native';
import { fonts } from '../../utils/fonts';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'filled' | 'outlined';
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

export const Button = ({ 
  title, 
  onPress, 
  variant = 'filled', 
  style, 
  textStyle,
  disabled = false,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === 'outlined' ? styles.outlinedButton : styles.filledButton,
        disabled && styles.disabledButton,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          styles.buttonText,
          variant === 'outlined' ? styles.outlinedText : styles.filledText,
          disabled && styles.disabledText,
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filledButton: {
    backgroundColor: '#007AFF',
  },
  outlinedButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  disabledButton: {
    backgroundColor: '#555555',
    borderColor: '#666666',
    opacity: 0.7,
  },
  buttonText: {
    fontFamily: fonts.displayMedium,
    fontSize: 18,
  },
  filledText: {
    color: '#FFFFFF',
  },
  outlinedText: {
    color: '#FFFFFF',
  },
  disabledText: {
    color: '#AAAAAA',
  },
}); 