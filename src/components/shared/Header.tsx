import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { fonts } from '../../utils/fonts';

interface HeaderProps {
  title: string;
  onHelpPress?: () => void;
}

export const Header = ({ title, onHelpPress }: HeaderProps) => {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <View style={styles.avatar} />
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity 
          style={styles.helpButton} 
          onPress={onHelpPress ? onHelpPress : undefined} 
          disabled={!onHelpPress}
        >
          <Text style={styles.helpText}>?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    paddingHorizontal: 16,
    paddingTop: 80,
    paddingBottom: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 900,
    padding: 8,
    height: 70,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E4B7E5', // Purple color from the image
    marginLeft: 10,
    marginRight: 8,
  },
  title: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    fontFamily: fonts.displayBold,
  },
  helpButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  helpText: {
    color: '#1A1A1A',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: fonts.displayBold,
  },
}); 