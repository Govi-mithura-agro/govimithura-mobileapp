import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const LoginSignupScreen = () => {

    const router = useRouter();

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/login-signup-image.png')}  // Path to your logo image
                style={styles.logo}
                resizeMode="contain"
            />
            <TouchableOpacity style={styles.button} onPress={() => router.push('/LoginScreen')} >
                <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.signupButton]} onPress={() => router.push('/SignupScreen')}>
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
        width: '100%',
        marginBottom: -100,
        marginTop: -380,
    },
    button: {
        backgroundColor: '#379137',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginVertical: 10,
        height: 44,
        width: 300,
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
