import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Button } from '../../components/shared/Button';
import { fonts } from '../../utils/fonts';

// Use the same RootStackParamList as in App.tsx
type RootStackParamList = {
  Loading: undefined;
  Splash: undefined;
  Onboarding: { onComplete?: () => void };
  SignUp: undefined;
  Success: { userName: string };
  Home: undefined;
};

type OnboardingScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;
  route: RouteProp<RootStackParamList, 'Onboarding'>;
};

const { width } = Dimensions.get('window');

const slides = [
  {
    title: 'Welcome to AceFi',
    text: 'Your AI-powered crypto exchange assistant',
    image: require('../../../assets/icon.png'),
  },
  {
    title: 'Easy Trading',
    text: 'Trade cryptocurrencies with simple voice commands',
    image: require('../../../assets/icon.png'),
  },
  {
    title: 'Smart Insights',
    text: 'Get AI-powered market insights and recommendations',
    image: require('../../../assets/icon.png'),
  },
];

export const OnboardingScreen = ({ navigation, route }: OnboardingScreenProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    handleComplete();
  };
  
  const handleComplete = () => {
    console.log('Onboarding complete, navigating to SignUp');
    
    // First check if we have an onComplete callback from the route params
    if (route.params?.onComplete) {
      console.log('Calling onComplete callback');
      route.params.onComplete();
    }
    
    // Then navigate to SignUp using navigation.replace to avoid stacking screens
    try {
      console.log('Replacing current screen with SignUp');
      navigation.replace('SignUp');
    } catch (error) {
      console.error('Navigation error:', error);
      
      // Fallback to navigate if replace fails
      try {
        console.log('Fallback: Using navigate method');
        navigation.navigate('SignUp');
      } catch (fallbackError) {
        console.error('Fallback navigation failed:', fallbackError);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <View style={styles.slideContainer}>
        <Image source={slides[currentSlide].image} style={styles.image} />
        <Text style={styles.title}>{slides[currentSlide].title}</Text>
        <Text style={styles.text}>{slides[currentSlide].text}</Text>
      </View>

      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === currentSlide && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title={currentSlide < slides.length - 1 ? 'Next' : 'Get Started'}
          onPress={handleNext}
          style={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  skipButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 10,
  },
  skipText: {
    color: '#007AFF',
    fontSize: 16,
    fontFamily: fonts.displayMedium,
  },
  slideContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width - 40,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: fonts.displayBold,
  },
  text: {
    fontSize: 16,
    color: '#CCCCCC',
    textAlign: 'center',
    paddingHorizontal: 20,
    fontFamily: fonts.displayRegular,
  },
  pagination: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#555555',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#007AFF',
    width: 20,
  },
  buttonContainer: {
    marginBottom: 50,
    width: '100%',
  },
  button: {
    marginBottom: 20,
  },
}); 