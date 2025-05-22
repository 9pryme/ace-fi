import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { ChatInput } from './ChatInput';

interface InitialStateProps {
  onStart: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
}

export const InitialState = ({ onStart, value, onChangeText }: InitialStateProps) => {
  const [name, setName] = useState('');

  const handleSend = (text: string) => {
    // Store the name
    if (text.trim()) {
      if (onChangeText) {
        // Use the external state if provided
        onChangeText(text);
      } else {
        // Use internal state
        setName(text);
      }
      // Call onStart after a short delay to let the UI update
      setTimeout(onStart, 100);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.circle} />
        <Text style={styles.title}>Hey buddy, What is your name?</Text>
      </View>
      <View style={styles.inputArea}>
        <ChatInput
          value={value}
          onChangeText={onChangeText}
          onSend={handleSend}
          placeholder="Type here"
          showMic={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'flex-end',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#333333',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
  },
  inputArea: {
    backgroundColor: '#000000',
  },
}); 