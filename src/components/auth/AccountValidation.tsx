import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { validateAccountNumber, Bank } from '../../services/smePlugAPI';
import { BankSelectionModal } from '../shared/BankSelectionModal';

interface AccountValidationProps {
  onSuccess: (data: { 
    accountNumber: string;
    accountName: string; 
    bankName: string;
    bankCode: string;
  }) => void;
  onCancel: () => void;
}

export const AccountValidation = ({ onSuccess, onCancel }: AccountValidationProps) => {
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [accountNumber, setAccountNumber] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [error, setError] = useState('');

  const isValidAccountNumber = accountNumber.length === 10 && /^\d+$/.test(accountNumber);
  const canVerify = selectedBank && isValidAccountNumber;

  const handleSelectBank = (bank: Bank) => {
    setSelectedBank(bank);
    setError('');
  };

  const handleAccountNumberChange = (text: string) => {
    // Allow only numbers and limit to 10 digits
    const formattedText = text.replace(/[^0-9]/g, '').slice(0, 10);
    setAccountNumber(formattedText);
    setError('');
  };

  const handleVerify = async () => {
    if (!canVerify) return;
    
    try {
      setIsVerifying(true);
      setError('');
      
      const result = await validateAccountNumber(
        selectedBank.code,
        accountNumber
      );
      
      if (result) {
        onSuccess({
          accountNumber: result.account_number,
          accountName: result.account_name,
          bankName: selectedBank.name, // Use the selected bank name since it's not returned by the API
          bankCode: selectedBank.code,
        });
      } else {
        setError('Could not validate account. Please check your details.');
      }
    } catch (err) {
      console.error('Account validation error:', err);
      setError('Failed to validate account. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Account Details</Text>
        <Text style={styles.subtitle}>Please enter your account information</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Select Bank</Text>
        <TouchableOpacity 
          style={styles.bankSelector} 
          onPress={() => setShowBankModal(true)}
        >
          <Text style={[
            styles.bankSelectorText,
            !selectedBank && styles.bankSelectorPlaceholder
          ]}>
            {selectedBank ? selectedBank.name : 'Select your bank'}
          </Text>
          <Ionicons name="chevron-down" size={20} color="#CCCCCC" />
        </TouchableOpacity>

        <Text style={styles.label}>Account Number</Text>
        <View style={styles.accountNumberContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter 10-digit account number"
            placeholderTextColor="#888888"
            value={accountNumber}
            onChangeText={handleAccountNumberChange}
            keyboardType="numeric"
            maxLength={10}
          />
          {accountNumber.length > 0 && !isValidAccountNumber && (
            <Text style={styles.inputError}>Please enter a valid 10-digit account number</Text>
          )}
        </View>

        {error ? (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle" size={18} color="#FF6B6B" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={onCancel}
          disabled={isVerifying}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.verifyButton,
            !canVerify && styles.verifyButtonDisabled
          ]}
          onPress={handleVerify}
          disabled={!canVerify || isVerifying}
        >
          {isVerifying ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.verifyButtonText}>Verify Account</Text>
          )}
        </TouchableOpacity>
      </View>

      <BankSelectionModal
        visible={showBankModal}
        onClose={() => setShowBankModal(false)}
        onSelectBank={handleSelectBank}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    overflow: 'hidden',
    marginVertical: 10,
  },
  header: {
    padding: 16,
    backgroundColor: '#007AFF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'SFProDisplay-Bold',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
    fontFamily: 'SFProDisplay-Regular',
  },
  inputContainer: {
    padding: 16,
  },
  label: {
    fontSize: 14,
    color: '#CCCCCC',
    marginBottom: 8,
    fontFamily: 'SFProDisplay-Regular',
  },
  bankSelector: {
    backgroundColor: '#2C2C2E',
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  bankSelectorText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'SFProDisplay-Regular',
  },
  bankSelectorPlaceholder: {
    color: '#888888',
  },
  accountNumberContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#2C2C2E',
    borderRadius: 10,
    padding: 16,
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'SFProDisplay-Regular',
  },
  inputError: {
    color: '#FF6B6B',
    fontSize: 12,
    marginTop: 4,
    fontFamily: 'SFProDisplay-Regular',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
    fontFamily: 'SFProDisplay-Regular',
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#444444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'SFProDisplay-Bold',
  },
  verifyButton: {
    flex: 1,
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifyButtonDisabled: {
    backgroundColor: '#333333',
  },
  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'SFProDisplay-Bold',
  },
}); 