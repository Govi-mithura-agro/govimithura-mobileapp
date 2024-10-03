import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from "@env";
import { Ionicons } from '@expo/vector-icons';  // Import icon library

const LoginScreen = () => {
    const router = useRouter();
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setPasswordVisibility] = useState(false);  // State to control password visibility

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Login Failed", "Please enter both email and password");
            return;
        }
        try {
            const response = await axios.post(`${API_URL}:5000/api/appuser/login`, {
                email,
                password
            });

            if (response.data.status === "Login Success") {
                const userDetails = response.data.loginUser;

                // Store user details in AsyncStorage
                await AsyncStorage.setItem('userDetails', JSON.stringify(userDetails));

                // Navigate to HomeScreen
                router.push('/HomeScreen');
            } else {
                Alert.alert("Login Failed", "The email or password is incorrect");
            }
        } catch (error) {
            Alert.alert("Login Failed", "The email or password is incorrect");
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisibility(!isPasswordVisible);  // Toggle password visibility
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />
            <Text style={styles.subtitle}>Sign in to continue</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />

            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!isPasswordVisible}  // Toggle visibility based on state
                />
                <TouchableOpacity onPress={togglePasswordVisibility} style={styles.visibilityToggle}>
                    <Ionicons
                        name={isPasswordVisible ? 'eye-off' : 'eye'}
                        size={24}
                        color="#666"
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.forgotPasswordLink} onPress={() => navigation.navigate('ForgotPasswordScreen')}>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            <View style={styles.signUpContainer}>
                <Text style={styles.signUpText}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
                    <Text style={styles.signUpLink}> Sign Up</Text>
                </TouchableOpacity>
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

        elevation: 5,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
        borderColor: '#DDD',
        borderWidth: 1,
        marginBottom: 20,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    passwordInput: {
        flex: 1,
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
    },
    visibilityToggle: {
        paddingHorizontal: 10,
    },
    forgotPassword: {
        fontSize: 14,
        color: '#379137',
        marginBottom: 0,
    },
    loginButton: {
        backgroundColor: '#379137',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginVertical: 10,
        height: 50,
        width: '100%',
        alignItems: 'center',

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
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
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: -10,
        marginTop: -20,
        marginLeft: '25%',
    },
});

export default LoginScreen;
