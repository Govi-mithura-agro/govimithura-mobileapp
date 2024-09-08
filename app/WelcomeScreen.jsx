import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

const WelcomeScreen = () => {
    return (
        <View style={styles.container}>
            {/* Logo */}
            <Image
                source={require('../assets/logo.png')}  // Update the path according to your project
                style={styles.logo}
                resizeMode="contain"
            />

            {/* Welcome Message */}
            <Text style={styles.welcomeText}>Welcome !</Text>

            {/* Buttons for Language Selection */}
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>English</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Sinhala</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',  // Optional: Background color
    },
    logo: {
        width: 200,  // Adjust based on your image size
        height: 200, // Adjust based on your image size
        marginBottom: 30,  // Space between logo and Welcome text
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2E7D32',  // Green color for text
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#2E7D32',  // Green button background
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginVertical: 10,
    },
    buttonText: {
        fontSize: 18,
        color: '#FFFFFF',  // White text color
    }
});

export default WelcomeScreen;
