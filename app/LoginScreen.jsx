import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Link, useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';

const LoginScreen = () => {

    const router = useRouter();
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>

            {/* Header Section */}
            <Image
                source={require('../assets/logo.png')}  // Update the path according to your project
                style={styles.logo}
                resizeMode="contain"
            />
            <Text style={styles.subtitle}>Sign in to continue</Text>

            {/* Email Input */}
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />

            {/* Password Input */}
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            {/* Forgot Password */}
            <Link to='/ForgotPasswordScreen' style={styles.forgotPasswordLink}>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </Link>
            {/* Login Button */}
            <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/HomeScreen')} >
                <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            {/* Sign Up Section */}
            <View style={styles.signUpContainer}>
                <Text style={styles.signUpText}>Don’t have an account?</Text>
                <Link to='/SignupScreen'>
                    <Text style={styles.signUpLink}> Sign Up</Text>
                </Link>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 20,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 30,
        fontFamily: 'Poppins-SemiBold',
    },
    input: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
        fontSize: 16,
        marginBottom: 20,
        borderColor: '#DDD',
        borderWidth: 1,
        fontFamily: 'Poppins-Regular',

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        // Shadow for Android (elevation)
        elevation: 5,
    },
    forgotPassword: {
        fontSize: 14,
        color: '#379137',
        marginBottom: 30,
    },
    loginButton: {
        backgroundColor: '#379137',  // Green button background
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginVertical: 10,
        height: 50,
        width: '100%',
        alignItems: 'center',

        // Shadow properties for iOS/web
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        // Shadow for Android (elevation)
        elevation: 5,
    },
    loginButtonText: {
        fontSize: 18,
        color: '#FFF',
        fontFamily: 'Poppins-SemiBold',
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    signUpText: {
        fontSize: 14,
        color: '#666',
        fontFamily: 'Poppins-Regular',
    },
    signUpLink: {
        fontSize: 14,
        color: '#379137',
        fontWeight: 'bold',
        fontFamily: 'Poppins-Regular',
    },
    forgotPasswordLink: {
        marginBottom: 30,
        fontFamily: 'Poppins-Regular',
    },
    logo: {
        width: 150, 
        height: 150, 
        marginBottom: -10, 
        marginTop: -20,
        marginLeft: '25%',  // Space between logo and input fields
    },
});

export default LoginScreen;
