import React from 'react';
import { View, StyleSheet, ScrollView, Text, ActivityIndicator } from 'react-native';
import { ChatBubble } from './ChatBubble';
import { ChatInput } from './ChatInput';
import { Button } from '../shared/Button';
import { Header } from '../shared/Header';
import { AccountVerification } from './AccountVerification';

interface ChatStateProps {
  messages: Array<{
    id: string;
    text: string;
    isAI: boolean;
  }>;
  userInput?: string;
  onChangeText?: (text: string) => void;
  onSend: (text: string) => void;
  showConfirmation?: boolean;
  onConfirm?: () => void;
  onStartOver?: () => void;
  accountDetails?: {
    name: string;
    email?: string;
    accountNumber: string;
    bankName: string;
  };
  loading?: boolean;
}

export const ChatState = ({
  messages,
  userInput,
  onChangeText,
  onSend,
  showConfirmation,
  onConfirm,
  onStartOver,
  accountDetails,
  loading = false,
}: ChatStateProps) => {
  const handleHelpPress = () => {
    // Handle help button press
    console.log('Help button pressed');
  };

  const scrollViewRef = React.useRef<ScrollView>(null);

  React.useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages, showConfirmation]);

  // Handle sending messages - compatibility with both old and new patterns
  const handleSendMessage = (text: string) => {
    if (onSend) {
      onSend(text);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Get Started With Ace" onHelpPress={handleHelpPress} />

      <ScrollView 
        style={styles.messageContainer}
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message) => (
          <ChatBubble
            key={message.id}
            message={message.text}
            isAI={message.isAI}
          />
        ))}
        
        {showConfirmation && accountDetails && (
          <AccountVerification
            accountDetails={accountDetails}
            onConfirm={onConfirm || (() => {})}
            onEdit={onStartOver || (() => {})}
            loading={loading}
          />
        )}
      </ScrollView>

      <ChatInput
        value={userInput}
        onChangeText={onChangeText}
        onSend={handleSendMessage}
        disabled={showConfirmation && loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  messageContainer: {
    flex: 1,
    padding: 16,
  },
}); 