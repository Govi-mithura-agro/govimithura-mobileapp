import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const LoginSignupScreen = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/logo.png')}  // Path to your logo image
                style={styles.logo}
                resizeMode="contain"
            />
            <Text style={styles.welcomeText}>Hello !</Text>
            <Text style={styles.description}>
                Your app for accurate and efficient measurements in the real world.
            </Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.signupButton]}>
                <Text style={styles.buttonText}>SIGN UP</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 0,
        marginTop: -50,
    },
    welcomeText: {
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 20,
        color: '#000000',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 200,
        marginTop: 10,
        paddingHorizontal: 20,
        color: '#555555',
    },
    button: {
        backgroundColor: '#2E7D32',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginVertical: 10,
        width: '80%',
    },
    signupButton: {
        backgroundColor: '#1B5E20',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        textAlign: 'center',
    }
});

export default LoginSignupScreen;
