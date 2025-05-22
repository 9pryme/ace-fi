import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fetchBankList, Bank } from '../../services/smePlugAPI';

const { height } = Dimensions.get('window');

type BankSelectionModalProps = {
  visible: boolean;
  onClose: () => void;
  onSelectBank: (bank: Bank) => void;
};

export const BankSelectionModal = ({
  visible,
  onClose,
  onSelectBank,
}: BankSelectionModalProps) => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [filteredBanks, setFilteredBanks] = useState<Bank[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (visible) {
      loadBanks();
    }
  }, [visible, retryCount]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredBanks(banks);
    } else {
      const filtered = banks.filter((bank) =>
        bank.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBanks(filtered);
    }
  }, [searchQuery, banks]);

  const loadBanks = async () => {
    try {
      console.log('Loading banks in BankSelectionModal...');
      setLoading(true);
      setError('');
      const bankList = await fetchBankList();
      
      if (bankList.length === 0) {
        console.warn('Received empty bank list');
        setError('No banks found. Please check your connection and try again.');
      } else {
        // Sort banks alphabetically
        const sortedBanks = bankList.sort((a, b) => a.name.localeCompare(b.name));
        console.log(`Loaded and sorted ${sortedBanks.length} banks`);
        
        setBanks(sortedBanks);
        setFilteredBanks(sortedBanks);
      }
    } catch (err) {
      console.error('Error loading banks in modal:', err);
      setError('Failed to load banks. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    console.log('Retrying bank list fetch...');
    setRetryCount(prev => prev + 1);
  };

  const handleBankSelect = (bank: Bank) => {
    console.log('Selected bank:', bank.name, bank.code);
    onSelectBank(bank);
    onClose();
  };

  const renderBankItem = ({ item }: { item: Bank }) => (
    <TouchableOpacity
      style={styles.bankItem}
      onPress={() => handleBankSelect(item)}
    >
      <Text style={styles.bankName}>{item.name}</Text>
      <Text style={styles.bankCode}>{item.code}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Select Your Bank</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search banks..."
              placeholderTextColor="#888"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCapitalize="none"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color="#888" />
              </TouchableOpacity>
            )}
          </View>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#007AFF" />
              <Text style={styles.loadingText}>Loading banks...</Text>
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle-outline" size={50} color="#FF6B6B" />
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
                <Text style={styles.retryButtonText}>Retry</Text>
              </TouchableOpacity>
            </View>
          ) : filteredBanks.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="search-outline" size={50} color="#CCCCCC" />
              <Text style={styles.emptyText}>No banks found matching "{searchQuery}"</Text>
              {searchQuery.length > 0 && (
                <TouchableOpacity style={styles.clearButton} onPress={() => setSearchQuery('')}>
                  <Text style={styles.clearButtonText}>Clear Search</Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <FlatList
              data={filteredBanks}
              keyExtractor={(item) => item.id}
              renderItem={renderBankItem}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContainer}
              initialNumToRender={15}
              maxToRenderPerBatch={20}
              windowSize={10}
            />
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#121212',
    height: height * 0.8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'SFProDisplay-Bold',
  },
  closeButton: {
    padding: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 15,
    paddingHorizontal: 15,
    backgroundColor: '#222',
    borderRadius: 10,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'SFProDisplay-Regular',
  },
  listContainer: {
    paddingHorizontal: 15,
  },
  bankItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bankName: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'SFProDisplay-Regular',
    flex: 1,
  },
  bankCode: {
    fontSize: 14,
    color: '#888888',
    fontFamily: 'SFProDisplay-Regular',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#CCCCCC',
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'SFProDisplay-Regular',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#FF6B6B',
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'SFProDisplay-Regular',
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'SFProDisplay-Bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    color: '#CCCCCC',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: 'SFProDisplay-Regular',
  },
  clearButton: {
    marginTop: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#333333',
  },
  clearButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'SFProDisplay-Medium',
  },
}); 