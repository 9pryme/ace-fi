import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { fonts } from '../../utils/fonts';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    // Start animations immediately - no need to wait for fonts
    if (!animationStarted) {
      console.log('Starting splash animations');
      setAnimationStarted(true);

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 20,
          friction: 7,
          useNativeDriver: true,
        })
      ]).start();

      // Transition to the main app after 2 seconds
      console.log('Setting timer for splash transition');
      const timer = setTimeout(() => {
        console.log('Splash transition timer fired, calling onComplete');
        onComplete();
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [animationStarted, onComplete, fadeAnim, scaleAnim]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>ace</Text>
          <Text style={styles.logoAccent}>fi</Text>
        </View>
        <Text style={styles.tagline}>Your AI-Powered Finance Partner</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 64,
    fontWeight: 'bold',
    fontFamily: fonts.displayBold,
  },
  logoAccent: {
    color: '#007AFF',
    fontSize: 64,
    fontWeight: 'bold',
    fontFamily: fonts.displayBold,
  },
  tagline: {
    color: '#666666',
    fontSize: 16,
    marginTop: 8,
    fontFamily: fonts.displayRegular,
  },
}); 