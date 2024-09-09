import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AppointmentFileUploadScreen = () => {
  const handleOpenFile = () => {
    // Implement file picker functionality here
    console.log('Open file picker');
  };

  const handleSkip = () => {
    // Implement skip functionality
    console.log('Skip pressed');
  };

  const handleContinue = () => {
    // Implement continue functionality
    console.log('Continue pressed');
  };

  return (
    <SafeAreaView style={styles.container}>      
      <View style={styles.content}>
        <View style={styles.uploadContainer}>
          <Icon name="cloud-upload" size={48} color="#379137" />
          <Text style={styles.uploadText}>Upload your file</Text>
        </View>
        
        <TouchableOpacity style={styles.openFileButton} onPress={handleOpenFile}>
          <Text style={styles.openFileButtonText}>Open file</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="home" size={24} color="#888" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="format-list-bulleted" size={24} color="#888" />
          <Text style={[styles.navText]}>Appointment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="bell-outline" size={24} color="#888" />
          <Text style={styles.navText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="account" size={24} color="#888" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  uploadContainer: {
    backgroundColor: '#e8f5e9',
    borderRadius: 8,
    padding: 32,
    alignItems: 'center',
    marginBottom: 16,
  },
  uploadText: {
    marginTop: 8,
    fontSize: 16,
    color: '#379137',
  },
  openFileButton: {
    backgroundColor: '#379137',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 250,
  },
  openFileButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  skipButton: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  skipButtonText: {
    color: '#379137',
    fontSize: 18,
  },
  continueButton: {
    backgroundColor: '#379137',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingVertical: 10,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 5,
    color: '#888',
  },
  activeNavText: {
    color: '#006B3E',
  },
});

export default AppointmentFileUploadScreen;