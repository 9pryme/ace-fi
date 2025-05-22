import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../shared/Button';

interface AccountDetails {
  name: string;
  email: string;
  accountNumber: string;
  bankName: string;
  accountName?: string; // Bank verified account name
}

interface AccountVerificationProps {
  accountDetails: AccountDetails;
  onConfirm: () => void;
  onEdit: () => void;
  loading?: boolean;
}

export const AccountVerification = ({
  accountDetails,
  onConfirm,
  onEdit,
  loading = false,
}: AccountVerificationProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Verify Your Details</Text>
        <Text style={styles.subtitle}>Please confirm your account information</Text>
      </View>

      <View style={styles.detailsContainer}>
        <DetailItem 
          label="Full Name" 
          value={accountDetails.name} 
          icon="person-outline" 
        />
        
        <DetailItem 
          label="Email Address" 
          value={accountDetails.email} 
          icon="mail-outline" 
        />
        
        {accountDetails.accountName && (
          <DetailItem 
            label="Account Name" 
            value={accountDetails.accountName} 
            icon="person-circle-outline" 
            highlight={true}
          />
        )}
        
        <DetailItem 
          label="Bank Name" 
          value={accountDetails.bankName} 
          icon="business-outline" 
        />
        
        <DetailItem 
          label="Account Number" 
          value={accountDetails.accountNumber} 
          icon="card-outline" 
          isLast={true}
        />
      </View>

      <View style={styles.disclaimer}>
        <Ionicons name="information-circle-outline" size={18} color="#007AFF" />
        <Text style={styles.disclaimerText}>
          By continuing, you confirm these details are correct. A verification link will be sent to your email.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Edit Details"
          onPress={onEdit}
          variant="outlined"
          style={styles.editButton}
          disabled={loading}
        />
        <Button
          title={loading ? "Creating Account..." : "Confirm Details"}
          onPress={onConfirm}
          style={styles.confirmButton}
          disabled={loading}
        />
      </View>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#007AFF" />
          <Text style={styles.loadingText}>Setting up your account...</Text>
        </View>
      )}
    </View>
  );
};

interface DetailItemProps {
  label: string;
  value: string;
  icon: string;
  isLast?: boolean;
  highlight?: boolean;
}

const DetailItem = ({ label, value, icon, isLast, highlight }: DetailItemProps) => (
  <View style={[styles.detailItem, isLast ? null : styles.detailItemBorder]}>
    <Ionicons name={icon as any} size={22} color={highlight ? "#00C853" : "#007AFF"} />
    <View style={styles.detailContent}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={[
        styles.detailValue,
        highlight && styles.highlightedValue
      ]}>{value}</Text>
    </View>
  </View>
);

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
  detailsContainer: {
    padding: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  detailItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2E',
  },
  detailContent: {
    marginLeft: 12,
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: '#8E8E93',
    fontFamily: 'SFProDisplay-Regular',
  },
  detailValue: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'SFProDisplay-Medium',
    marginTop: 2,
  },
  highlightedValue: {
    color: '#00C853', // Green color for verified account name
    fontWeight: 'bold',
  },
  disclaimer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    alignItems: 'flex-start',
  },
  disclaimerText: {
    fontSize: 14,
    color: '#CCCCCC',
    marginLeft: 8,
    flex: 1,
    fontFamily: 'SFProDisplay-Regular',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    gap: 12,
  },
  editButton: {
    flex: 1,
  },
  confirmButton: {
    flex: 1,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 16,
  },
  loadingText: {
    color: '#FFFFFF',
    marginLeft: 8,
    fontFamily: 'SFProDisplay-Regular',
  },
}); 