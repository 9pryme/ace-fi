import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button } from '../../components/shared/Button';

// Make sure this type matches the RootStackParamList in App.tsx
type RootStackParamList = {
  Loading: undefined;
  Splash: undefined;
  Onboarding: { onComplete?: () => void };
  SignUp: undefined;
  Success: { userName: string };
  Home: undefined;
};

type SuccessScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Success'>;
  route: { params: { userName: string } };
};

export const SuccessScreen = ({ navigation, route }: SuccessScreenProps) => {
  const { userName } = route.params;
  const scaleAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 7,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleContinue = () => {
    try {
      console.log('Navigating to Home screen...');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error) {
      console.error('Error navigating to Home:', error);
      // Fallback navigation method if reset fails
      try {
        navigation.navigate('Home');
      } catch (navError) {
        console.error('Both navigation methods failed:', navError);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[
        styles.successCircle,
        {
          transform: [{ scale: scaleAnim }]
        }
      ]}>
        <Text style={styles.checkmark}>✓</Text>
      </Animated.View>
      
      <Text style={styles.title}>Welcome, {userName}!</Text>
      <Text style={styles.subtitle}>Your account has been created successfully</Text>
      
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsText}>
          You can now start using all features of the Ace-Fi platform.
        </Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <Button
          title="Get Started"
          onPress={handleContinue}
          style={styles.startButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  successCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#00C853',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 60,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
    fontFamily: 'SFProDisplay-Bold',
  },
  subtitle: {
    fontSize: 18,
    color: '#CCCCCC',
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'SFProDisplay-Regular',
  },
  detailsContainer: {
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    marginBottom: 40,
  },
  detailsText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: 'SFProDisplay-Regular',
  },
  buttonContainer: {
    width: '100%',
  },
  startButton: {
    marginBottom: 10,
  },
}); 