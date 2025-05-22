import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Alert, TextInput, View, Text, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { InitialState } from '../../components/auth/InitialState';
import { ChatState } from '../../components/auth/ChatState';
import { AccountVerification } from '../../components/auth/AccountVerification';
import { AccountValidation } from '../../components/auth/AccountValidation';

type Message = {
  id: string;
  text: string;
  isAI: boolean;
};

type RootStackParamList = {
  Loading: undefined;
  Splash: undefined;
  Onboarding: { onComplete?: () => void };
  SignUp: undefined;
  Success: { userName: string };
  Home: undefined;
};

type SignUpScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SignUp'>;
};

export const SignUpScreen = ({ navigation }: SignUpScreenProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState<'initial' | 'chat' | 'verification'>('initial');
  const [showAccountValidation, setShowAccountValidation] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [accountDetails, setAccountDetails] = useState({
    name: '',
    email: '',
    bankName: '',
    accountNumber: '',
    bankCode: '',
    accountName: '',
  });
  const [emailError, setEmailError] = useState<string | null>(null);

  const addMessage = (text: string, isAI: boolean = false) => {
    setMessages(prev => [...prev, { id: Date.now().toString(), text, isAI }]);
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleConfirm = async () => {
    try {
      setLoading(true);
      
      if (!accountDetails.email) {
        setEmailError('Email is required');
        setLoading(false);
        return;
      }
      
      if (!isValidEmail(accountDetails.email)) {
        setEmailError('Please enter a valid email address');
        setLoading(false);
        return;
      }
      
      // TODO: Implement account creation logic here
      
      // Confirm to user
      addMessage('Your account has been created successfully! 🎉', true);
      addMessage('You can now start using the app.', true);
      
      // Give a short delay to show the message before navigating
      setTimeout(() => {
        // Navigate to Success screen with name
        navigation.navigate('Success', { 
          userName: accountDetails.name.split(' ')[0]
        });
      }, 1500);
      
    } catch (error) {
      console.error('Error creating account:', error);
      Alert.alert('Error', 'There was a problem creating your account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAccountValidationSuccess = (data: {
    accountNumber: string;
    accountName: string;
    bankName: string;
    bankCode: string;
  }) => {
    setAccountDetails(prev => ({
      ...prev,
      accountNumber: data.accountNumber,
      bankName: data.bankName,
      bankCode: data.bankCode,
      accountName: data.accountName,
    }));
    
    setShowAccountValidation(false);
    setCurrentStep('verification');
    
    // Add a message showing the validated account
    addMessage(`Account verified: ${data.accountName}`, true);
    
    setTimeout(() => {
      addMessage("Perfect! Please verify your details to continue.", true);
      setShowVerification(true);
    }, 500);
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    addMessage(userInput);
    setUserInput('');
    // TODO: Implement AI response logic here
  };

  if (showAccountValidation) {
    return (
      <AccountValidation
        onSuccess={handleAccountValidationSuccess}
        onCancel={() => setShowAccountValidation(false)}
      />
    );
  }

  if (showVerification) {
    return (
      <AccountVerification
        accountDetails={accountDetails}
        onConfirm={handleConfirm}
        onEdit={() => setShowVerification(false)}
        loading={loading}
      />
    );
  }

  if (currentStep === 'initial') {
    return (
      <InitialState
        onStart={() => setCurrentStep('chat')}
        value={userInput}
        onChangeText={setUserInput}
      />
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ChatState
        messages={messages}
        userInput={userInput}
        onChangeText={setUserInput}
        onSend={handleSendMessage}
        loading={loading}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
}); 