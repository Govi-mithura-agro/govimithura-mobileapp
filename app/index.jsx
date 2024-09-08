import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const index = () => {

    const router = useRouter();  // To navigate between screens

    useEffect(() => {
        // Redirect to WelcomeScreen after 2 seconds
        const timeout = setTimeout(() => {
            router.replace('/WelcomeScreen');
        }, 2000);

        // Clean up the timeout if the component unmounts
        return () => clearTimeout(timeout);
    }, []);

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/logo.png')} // Update the path based on where you save the image
                style={styles.logo}
                resizeMode="contain"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF', // Optional: Background color
    },
    logo: {
        width: 300, // Adjust based on your image size
        height: 300, // Adjust based on your image size
    },
});

export default index;