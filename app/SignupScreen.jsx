import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SignupScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Hi!</Text>
                <Text style={styles.subtitle}>Create a new account</Text>

                <TextInput style={styles.input} placeholder="Name" />
                <TextInput style={styles.input} placeholder="E-mail" />
                <View style={styles.phoneInput}>
                    <Text style={styles.phonePrefix}>+94</Text>
                    <TextInput style={styles.phoneNumber} placeholder="Phone number" />
                </View>
                <TextInput style={styles.input} placeholder="Password" secureTextEntry />
                <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry />

                <View style={styles.checkboxContainer}>
                    <TouchableOpacity style={styles.checkbox} />
                    <Text style={styles.checkboxLabel}>Save for later</Text>
                </View>

                <TouchableOpacity style={styles.signUpButton}>
                    <Text style={styles.signUpButtonText}>SIGN UP</Text>
                </TouchableOpacity>

                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>Have an account? </Text>
                    <TouchableOpacity>
                        <Text style={styles.loginLink}>Log in</Text>
                    </TouchableOpacity>
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
        backgroundColor: '#F1F1F1',
    },
    content: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: '#FFF',
    },
    phoneInput: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: '#FFF',
    },
    phonePrefix: {
        padding: 10,
        borderRightWidth: 1,
        borderRightColor: '#ddd',
    },
    phoneNumber: {
        flex: 1,
        padding: 10,
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
    },
    signUpButton: {
        backgroundColor: '#379137',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    signUpButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    loginText: {
        fontSize: 14,
    },
    loginLink: {
        fontSize: 14,
        color: '#379137',
        fontWeight: 'bold',
    },
    termsText: {
        fontSize: 12,
        textAlign: 'center',
        marginTop: 20,
        color: '#888',
    },
});

export default SignupScreen;