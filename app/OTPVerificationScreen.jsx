import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import axios from 'axios'; // Make sure to install axios: npm install axios
import { API_URL } from "@env";
import { useNavigation, useRoute } from '@react-navigation/native';

const OTPVerificationScreen = () => {
    const router = useRouter();
    const navigation = useNavigation();
    const route = useRoute();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);

    const { name, email, contact, password } = route.params;


    const handleOtpChange = (value, index) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move to next input if value is entered
        if (value !== '' && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleSignup = async () => {
        
        try {
            const response = await axios.post(`${API_URL}:5000/api/appuser/register`, {
                name,
                email,
                contact: `+94${contact}`,
                password
            });

            if (response.status === 200) {
                Alert.alert('Success', 'User registered successfully');
                router.push('/LoginScreen');
            }
        } catch (error) {
            Alert.alert('Error', error.response?.data?.message || 'An error occurred during registration');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>OTP Verification</Text>
                <Text style={styles.description}>
                    Please enter the code sent to <Text style={styles.descriptionnuumber}>+94 77 123 4567</Text>
                </Text>
                <View style={styles.otpContainer}>
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            style={styles.otpInput}
                            value={digit}
                            onChangeText={(value) => handleOtpChange(value, index)}
                            keyboardType="numeric"
                            maxLength={1}
                            ref={(ref) => (inputRefs.current[index] = ref)}
                        />
                    ))}
                </View>
                <TouchableOpacity style={styles.continueButton} onPress={() => handleSignup()} >
                    <Text style={styles.continueButtonText}>Verify</Text>
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
    content: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 8,
        fontFamily: 'Poppins-SemiBold',
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 20,
        fontFamily: 'Poppins-Regular',
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    otpInput: {
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 18,
        
    },
    continueButton: {
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
    continueButtonText: {
        fontSize: 18,
        color: '#FFF',
        fontFamily: 'Poppins-SemiBold',
    },
    descriptionnuumber:{
        fontFamily: 'Poppins-SemiBold',
        color: '#379137',
        textDecorationLine: 'underline'  // underline the number.
    }
});

export default OTPVerificationScreen;