import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

interface ChatBubbleProps {
  message: string;
  isAI: boolean;
}

export const ChatBubble = ({ message, isAI }: ChatBubbleProps) => {
  return (
    <View
      style={[
        styles.messageBubble,
        isAI ? styles.aiBubble : styles.userBubble,
      ]}
    >
      <Text style={styles.messageText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginVertical: 8,
  },
  aiBubble: {
    backgroundColor: '#2C2C2E',
    alignSelf: 'flex-start',
  },
  userBubble: {
    backgroundColor: '#007AFF',
    alignSelf: 'flex-end',
  },
  messageText: {
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
    color: '#FFFFFF',
    fontSize: 16,
  },
}); 