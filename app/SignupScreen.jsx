import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import { API_URL } from "@env";

const SignupScreen = () => {
    const navigation = useNavigation();
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState("");
    const [errorpassword, setErrorPassword] = useState("");
    const [emailError, setEmailError] = useState("");

    const requestOTP = async () => {
        try {
            const response = await axios.post(`${API_URL}:5000/api/appuser/request-otp`, {
                contact: `+94${contact}`
            });
            if (response.status === 200 && response.data.otp) {
                navigation.navigate("OTPVerificationScreen", {
                    name,
                    email,
                    contact,
                    password,
                    otp: response.data.otp
                });
            } else {
                Alert.alert('Error', 'Failed to generate OTP');
            }
        } catch (error) {
            Alert.alert('Error', error.response?.data?.message || 'Failed to send OTP');
        }
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            setErrorPassword('Passwords do not match');
            return;
        }
        setErrorPassword("");

        if (!name || !email || !contact || !password) {
            Alert.alert('Warning', 'Please fill in all required fields');
            return;
        }

        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address');
            return;
        }
        setEmailError("");

        if (name && email && contact && password) {
            const numericValue = contact.replace(/[^0-9]/g, "");
            if (!numericValue.startsWith("7")) {
                setError('Phone number must start with "7"');
                return;
            }
            if (numericValue.length !== 9) {
                setError("Phone number should be exactly 9 digits");
                return;
            }
            setContact(numericValue);
            setError("");
            await requestOTP();
        } else {
            Alert.alert("Warning", "Please fill in all required fields");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.content}>
                    <Text style={styles.subtitle}>Create a new account</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="E-mail"
                        value={email}
                        onChangeText={(text) => {
                            setEmail(text);
                            setEmailError("");
                        }}
                        keyboardType="email-address"
                    />
                    {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                    <View style={styles.phoneInput}>
                        <Text style={styles.phonePrefix}>+94</Text>
                        <TextInput
                            style={styles.phoneNumber}
                            placeholder="Phone number"
                            keyboardType="phone-pad"
                            maxLength={9}
                            value={contact}
                            onChangeText={setContact}
                        />
                    </View>
                    {error ? <Text style={styles.errorText}>{error}</Text> : null}
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    {errorpassword ? <Text style={styles.errorText}>{errorpassword}</Text> : null}

                    <TouchableOpacity style={styles.signUpButton} onPress={handleSignup}>
                        <Text style={styles.signUpButtonText}>SIGN UP</Text>
                    </TouchableOpacity>

                    <View style={styles.loginContainer}>
                        <Text style={styles.loginText}>Have an account? </Text>
                        <Link href='/LoginScreen'>
                            <Text style={styles.loginLink}>Log in</Text>
                        </Link>
                    </View>

                    <Text style={styles.termsText}>
                        By clicking "SIGN UP" you agree to our terms of service and Privacy Policy
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    content: {
        flex: 1,
        padding: 20,
    },
    subtitle: {
        fontSize: 20,
        color: '#666',
        marginBottom: 20,
        fontFamily: 'Poppins-SemiBold',
    },
    input: {
        fontFamily: 'Poppins-Regular',
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
        fontSize: 16,
        marginBottom: 20,
        borderColor: '#DDD',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    phoneInput: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#FFF',
        padding: 5,
        borderRadius: 10,
        fontSize: 16,
        marginBottom: 20,
        fontFamily: 'Poppins-Regular',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    phonePrefix: {
        padding: 15,
        borderRightWidth: 1,
        borderRightColor: '#ddd',
        fontFamily: 'Poppins-Regular'
    },
    phoneNumber: {
        flex: 1,
        padding: 10,
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
    },
    signUpButton: {
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
    signUpButtonText: {
        fontSize: 18,
        color: '#FFF',
        fontFamily: 'Poppins-SemiBold'
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    loginText: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
    },
    loginLink: {
        fontSize: 14,
        color: '#379137',
        fontWeight: 'bold',
        fontFamily: 'Poppins-Regular',
    },
    termsText: {
        fontSize: 12,
        textAlign: 'center',
        marginTop: 10,
        color: '#888',
        fontFamily: 'Poppins-Regular',
    },
    errorText: {
        color: "red",
        marginTop: -15,
        marginBottom: 10,
        fontFamily: 'Poppins-Regular'
    },
});

export default SignupScreen;