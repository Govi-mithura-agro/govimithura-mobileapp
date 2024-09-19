import { Link } from "expo-router";
import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const WelcomeScreen = () => {

    const router = useRouter();

    return (
        <View style={styles.container}>
            {/* Logo */}
            <Image
                source={require('../assets/logo.png')}  // Update the path according to your project
                style={styles.logo}
                resizeMode="contain"
            />

            {/* Buttons for Language Selection */}
            <TouchableOpacity
                style={styles.buttonEnglish}
                onPress={() => router.push('/LoginScreen')}
            >
                <Text style={styles.buttonTextEnglish}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonSinhala}>
                <Text style={styles.buttonTextSinhala}>Sinhala</Text>
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
    buttonEnglish: {
        backgroundColor: '#379137',  // Green button background
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginVertical: 10,
        height: 50,
        width: 300,
        alignItems: 'center',

        // Shadow properties for iOS/web
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        // Shadow for Android (elevation)
        elevation: 5,
    },
    buttonSinhala: {
        backgroundColor: '#FFFF',  // Green button background
        paddingVertical: 12,
        paddingHorizontal: 50,
        borderRadius: 10,
        marginVertical: 10,
        height: 50,
        width: 300,
        alignItems: 'center',

        // Shadow properties for iOS/web
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        // Shadow for Android (elevation)
        elevation: 5,
    },
    buttonTextEnglish: {
        fontSize: 18,
        color: '#FFFFFF',  // White text color
        fontFamily: 'Poppins-SemiBold',  // Update the font family according to your project
    },
    buttonTextSinhala: {
        fontSize: 18,
        color: '#379137',  // White text color
        fontFamily: 'Poppins-SemiBold',  // Update the font family according to your project
    }
});

export default WelcomeScreen;
