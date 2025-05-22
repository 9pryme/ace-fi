import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { fonts } from '../utils/fonts';

interface ChatInputProps {
  onSend: (text: string) => void;
  placeholder?: string;
  initialValue?: string;
}

export const ChatInput = ({
  onSend,
  placeholder = 'Type your response...',
  initialValue = '',
}: ChatInputProps) => {
  const [value, setValue] = useState(initialValue);

  const handleSend = () => {
    if (!value.trim()) return;
    onSend(value);
    setValue('');
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        placeholderTextColor="#666"
        onSubmitEditing={handleSend}
      />
      <TouchableOpacity 
        style={[styles.sendButton, !value.trim() && styles.disabledButton]} 
        onPress={handleSend}
        disabled={!value.trim()}
      >
        <Text style={styles.sendButtonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#2C2C2E',
    backgroundColor: '#000000',
  },
  input: {
    flex: 1,
    backgroundColor: '#2C2C2E',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
    color: '#FFFFFF',
    fontFamily: fonts.textRegular,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: '#555555',
    opacity: 0.7,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontFamily: fonts.textRegular,
    fontSize: 16,
  },
}); 