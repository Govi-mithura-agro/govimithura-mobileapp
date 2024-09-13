import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import NavBar from "./NavBar";

const AppointmentVoiceTextScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { district, phone } = route.params;

    const handleContinueTextMessage = () => {
        if (district && phone) {
            navigation.navigate('MessageScreen', {
                district,
                phone
            });
        } else {
            console.log("Please select a district and enter a phone number");
        }
    };

    const handleContinueVoicMessage = () => {
        
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.contentContainer}>

                <View style={styles.iconContainer}>
                    <View style={styles.iconWrapper}>
                        <Icon name="microphone-outline" size={48} color="black" />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleContinueVoicMessage}>
                        <Text style={styles.buttonText}>Voice message</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.iconContainer}>
                    <View style={styles.iconWrapper}>
                        <Icon name="message-outline" size={48} color="black" />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleContinueTextMessage}>
                        <Text style={styles.buttonText}>Text message</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Bottom Navigation */}
            <NavBar />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E8F5E9',
        padding: 20,
        borderRadius: 10,
        margin: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    infoText: {
        fontSize: 16,
        marginBottom: 20,
    },
    iconContainer: {
        marginBottom: 30,
        alignItems: 'center',
    },
    iconWrapper: {
        backgroundColor: '#fff',
        borderRadius: 50,
        padding: 15,
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#379137',
        paddingHorizontal: 40,
        paddingVertical: 10,
        borderRadius: 5,
        marginBottom: 35,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AppointmentVoiceTextScreen;
