import React, { useState, useCallback, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreenExpo from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { SignUpScreen } from './src/screens/auth/SignUpScreen';
import { OnboardingScreen } from './src/screens/auth/OnboardingScreen';
import { SuccessScreen } from './src/screens/auth/SuccessScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { LoadingScreen } from './src/screens/LoadingScreen';
import { SplashScreen } from './src/components/shared/SplashScreen';

// Keep the splash screen visible while we fetch resources
SplashScreenExpo.preventAutoHideAsync();

// Define the navigation types
export type RootStackParamList = {
  Loading: undefined;
  Splash: undefined;
  Onboarding: { onComplete?: () => void };
  SignUp: undefined;
  Success: { userName: string };
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [showOnboarding, setShowOnboarding] = useState(true);

  // Load fonts directly with expo-font's useFonts hook
  const [fontsLoaded] = useFonts({
    'SFProDisplay': require('./src/assets/fonts/SF-Pro-Display-Regular.otf'),
    'SFProDisplay-Medium': require('./src/assets/fonts/SF-Pro-Display-Medium.otf'),
    'SFProDisplay-Bold': require('./src/assets/fonts/SF-Pro-Display-Bold.otf'),
    'SFProText': require('./src/assets/fonts/SF-Pro-Text-Regular.otf'),
    'SFProText-Bold': require('./src/assets/fonts/SF-Pro-Text-Bold.otf'),
  });

  const handleOnboardingComplete = () => {
    console.log('Onboarding complete');
    setShowOnboarding(false);
  };
  
  // Handle hiding the splash screen
  useEffect(() => {
    const hideSplash = async () => {
      if (fontsLoaded) {
        // Wait for fonts to load, then hide the splash screen
        await SplashScreenExpo.hideAsync();
      }
    };
    
    hideSplash();
  }, [fontsLoaded]);
  
  if (!fontsLoaded) {
    // This is a backup loading screen in case the Expo splash screen doesn't work
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  // Determine the initial route based on onboarding status
  const initialRouteName: keyof RootStackParamList = showOnboarding ? 'Onboarding' : 'SignUp';

  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initialRouteName}
          screenOptions={{
            headerShown: false,
            animation: 'fade',
          }}
        >
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            initialParams={{ onComplete: handleOnboardingComplete }}
          />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Success" component={SuccessScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Loading" component={LoadingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  loadingText: {
    color: '#FFFFFF',
    marginTop: 10,
    fontSize: 16,
  },
});
