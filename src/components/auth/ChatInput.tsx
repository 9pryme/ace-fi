import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fonts } from '../../utils/fonts';

// Support both old and new prop styles
interface ChatInputProps {
  // New style - just pass onSend function that takes text
  onSend?: (text: string) => void;
  
  // Old style - control value externally
  value?: string;
  onChangeText?: (text: string) => void;
  
  // Common props
  placeholder?: string;
  disabled?: boolean;
  showMic?: boolean;
}

export const ChatInput = ({
  value: externalValue,
  onChangeText,
  onSend,
  placeholder = 'Type here',
  disabled = false,
  showMic = false,
}: ChatInputProps) => {
  // Internal state for new style
  const [internalValue, setInternalValue] = useState('');
  
  // Determine if we're using controlled or uncontrolled mode
  const isControlled = externalValue !== undefined && onChangeText !== undefined;
  const currentValue = isControlled ? externalValue : internalValue;
  
  const handleChangeText = (text: string) => {
    if (isControlled && onChangeText) {
      onChangeText(text);
    } else {
      setInternalValue(text);
    }
  };
  
  const handleSend = () => {
    if (!currentValue.trim()) return;
    
    if (onSend) {
      // New style - pass text to onSend
      onSend(currentValue);
      
      // Clear internal value if uncontrolled
      if (!isControlled) {
        setInternalValue('');
      }
    } else if (isControlled && onChangeText) {
      // Old style - just clear the input and assume parent handles it
      onChangeText('');
    }
  };

  const getIconName = () => {
    if (currentValue.length > 0) return "send";
    return showMic ? "mic" : "send";
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={[styles.input, disabled && styles.disabledInput]}
        value={currentValue}
        onChangeText={handleChangeText}
        placeholder={placeholder}
        placeholderTextColor="#666"
        onSubmitEditing={handleSend}
        returnKeyType="send"
        editable={!disabled}
      />
      <TouchableOpacity 
        style={[
          styles.button, 
          disabled && styles.disabledButton,
          !currentValue.trim() && !showMic && styles.disabledButton
        ]}
        onPress={handleSend}
        disabled={disabled || (!currentValue.trim() && !showMic)}
      >
        <Ionicons 
          name={getIconName()} 
          size={20} 
          color="#FFFFFF" 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
    backgroundColor: '#000000',
    borderTopWidth: 0,
  },
  input: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 8,
    color: '#FFFFFF',
    fontFamily: fonts.textRegular,
    fontSize: 16,
  },
  disabledInput: {
    backgroundColor: '#151515',
    color: '#555555',
  },
  button: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#555555',
    opacity: 0.7,
  }
});