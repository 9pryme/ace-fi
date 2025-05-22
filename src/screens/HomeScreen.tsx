import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator, Text, TouchableOpacity, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ChatBubble } from '../components/auth/ChatBubble';
import { ChatInput } from '../components/ChatInput';
import { Header } from '../components/shared/Header';
import { Ionicons } from '@expo/vector-icons';
import { fonts } from '../utils/fonts';

// This should match the RootStackParamList in App.tsx
type RootStackParamList = {
  Loading: undefined;
  Splash: undefined;
  Onboarding: { onComplete?: () => void };
  SignUp: undefined;
  Success: { userName: string };
  Home: undefined;
};

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

type Message = {
  id: string;
  text: string;
  isAI: boolean;
};

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const addMessage = (text: string, isAI: boolean = false) => {
    setMessages(prev => [...prev, { id: Date.now().toString(), text, isAI }]);
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    addMessage(text);

    // TODO: Implement AI response logic here
    setLoading(true);
    try {
      // Simulate AI response
      setTimeout(() => {
        addMessage("I'm your AI assistant. How can I help you today?", true);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error getting AI response:', error);
      Alert.alert('Error', 'Failed to get AI response. Please try again.');
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Ace-Fi" />
      <ScrollView style={styles.messagesContainer}>
        {messages.map(message => (
          <ChatBubble
            key={message.id}
            message={message.text}
            isAI={message.isAI}
          />
        ))}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#fff" />
          </View>
        )}
      </ScrollView>
      <ChatInput onSend={handleSendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    padding: 16,
    alignItems: 'center',
  },
}); 