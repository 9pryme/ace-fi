import { Alert } from 'react-native';

// API Configuration
const API_BASE_URL = 'https://smeplug.ng/api/v1';
const API_KEY = 'ed4155359e54d7d9ee3e7b5726829ba16666aa8c074fbfde643a096cef486c7f';

// Types
export type Bank = {
  id: string;
  code: string;
  name: string;
};

export type AccountValidationResult = {
  account_name: string;
  account_number: string;
  bank_code: string;
  bank_name?: string;
};

// API request headers
const getHeaders = () => ({
  Authorization: `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
});

/**
 * Fetch list of banks from SmePlugAPI
 */
export const fetchBankList = async (): Promise<Bank[]> => {
  try {
    console.log('Fetching bank list from SmePlugAPI...');
    const response = await fetch(`${API_BASE_URL}/transfer/banks`, {
      method: 'GET',
      headers: getHeaders(),
    });
    
    if (!response.ok) {
      console.error(`Bank list API returned status ${response.status}`);
      throw new Error(`Failed to fetch banks: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Bank list API response:', JSON.stringify(data).substring(0, 200) + '...');
    
    if (!data.banks || !Array.isArray(data.banks)) {
      console.error('Invalid bank list format:', data);
      throw new Error('Invalid response format');
    }
    
    const formattedBanks = data.banks.map((bank: any) => ({
      id: bank.code,
      code: bank.code,
      name: bank.name,
    }));
    
    console.log(`Successfully fetched ${formattedBanks.length} banks`);
    return formattedBanks;
  } catch (error) {
    console.error('Error fetching bank list:', error);
    Alert.alert('Error', 'Failed to load bank list. Please try again.');
    return [];
  }
};

/**
 * Validate account number with bank
 */
export const validateAccountNumber = async (
  bankCode: string,
  accountNumber: string
): Promise<AccountValidationResult | null> => {
  try {
    console.log(`Validating account ${accountNumber} with bank code ${bankCode}...`);
    const payload = {
      bank_code: bankCode,
      account_number: accountNumber,
    };
    
    console.log('Account validation payload:', JSON.stringify(payload));
    
    const response = await fetch(`${API_BASE_URL}/transfer/resolveaccount`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });
    
    const responseText = await response.text();
    console.log('Account validation raw response:', responseText);
    
    if (!response.ok) {
      console.error(`Account validation API returned status ${response.status}: ${responseText}`);
      throw new Error(`Failed to validate account: ${response.status}`);
    }
    
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse account validation response:', e);
      throw new Error('Invalid response format');
    }
    
    console.log('Account validation parsed response:', JSON.stringify(data));
    
    if (!data.status) {
      console.error('Account validation failed:', data);
      throw new Error('Account validation failed');
    }
    
    // The API returns the account name directly in the 'name' field
    return {
      account_name: data.name,
      account_number: accountNumber,
      bank_code: bankCode,
      // Use the bank code as reference since we don't get bank_name in the response
      bank_name: undefined,
    };
  } catch (error) {
    console.error('Error validating account:', error);
    Alert.alert('Error', 'Could not validate account details. Please check and try again.');
    return null;
  }
}; 