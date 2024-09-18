import Link from "@react-navigation/native/src/Link";
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';

const SignupScreen = () => {
    const router = useRouter();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.subtitle}>Create a new account</Text>

                <TextInput style={styles.input} placeholder="Name" />
                <TextInput style={styles.input} placeholder="E-mail" />
                <View style={styles.phoneInput}>
                    <Text style={styles.phonePrefix}>+94</Text>
                    <TextInput style={styles.phoneNumber} placeholder="Phone number" keyboardType="phone-pad" maxLength={9} />
                </View>
                <TextInput style={styles.input} placeholder="Password" secureTextEntry />
                <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry />

                <View style={styles.checkboxContainer}>
                    <TouchableOpacity style={styles.checkbox} />
                    <Text style={styles.checkboxLabel}>Save for later</Text>
                </View>

                <TouchableOpacity style={styles.signUpButton} onPress={() => router.push('/OTPVerificationScreen')}>
                    <Text style={styles.signUpButtonText}>SIGN UP</Text>
                </TouchableOpacity>

                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>Have an account? </Text>
                    <Link to='/LoginScreen'>
                        <Text style={styles.loginLink}>Log in</Text>
                    </Link>
                </View>

                <Text style={styles.termsText}>
                    By clicking "SIGN UP" you agree to our terms of service and Privacy Policy
                </Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
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

        // Shadow for Android (elevation)
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

        // Shadow for Android (elevation)
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
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        marginRight: 10,
        backgroundColor: '#FFF',
    },
    checkboxLabel: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
    },
    signUpButton: {
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
});

export default SignupScreen;