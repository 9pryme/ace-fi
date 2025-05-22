import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fonts } from '../../utils/fonts';

interface ChatBubbleProps {
  message: string;
  isAI: boolean;
  showAvatar?: boolean;
}

export const ChatBubble = ({ message, isAI, showAvatar = true }: ChatBubbleProps) => {
  return (
    <View style={[
      styles.container,
      isAI ? styles.aiContainer : styles.userContainer
    ]}>
      {isAI && showAvatar && (
        <View style={styles.avatar}>
          {/* Add your avatar image here */}
        </View>
      )}
      <Text style={[
        styles.messageText,
        isAI ? styles.aiText : styles.userText
      ]}>
        {message}
      </Text>
      {!isAI && (
        <View style={styles.userInfoContainer}>
          <Text style={styles.youText}>You</Text>
          <View style={styles.checkmark}>
            <Text style={styles.checkmarkText}>✓</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 8,
    borderRadius: 18,
    padding: 12,
    maxWidth: '80%',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E4B7E5',
    marginRight: 8,
  },
  aiContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#1c1c1e',
    borderBottomLeftRadius: 4,
  },
  userContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#0a84ff',
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: fonts.textRegular,
  },
  aiText: {
    color: '#ffffff',
  },
  userText: {
    color: '#ffffff',
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
    marginBottom: 2,
  },
  youText: {
    color: '#999',
    fontSize: 12,
    fontFamily: fonts.displayRegular,
    marginRight: 4,
  },
  checkmark: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
}); 