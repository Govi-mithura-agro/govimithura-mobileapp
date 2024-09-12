import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';

const AppointmentScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { district, phone } = route.params;
    const [message, setMessage] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.infoText}>Selected District: {district}</Text>
            <Text style={styles.infoText}>Phone Number: {phone}</Text>
            <View style={styles.content}>
                <View style={styles.messageContainer}>
                    <TextInput
                        style={styles.messageInput}
                        placeholder="Message"
                        value={message}
                        onChangeText={setMessage}
                        multiline
                    />
                </View>

                <TouchableOpacity style={styles.continueButton} onPress={() => router.push('/AppointmentFileUploadScreen')}>
                    <Text style={styles.continueButtonText}>Continue</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem}>
                    <Icon name="home" size={24} color="#888" />
                    <Text style={styles.navText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Icon name="format-list-bulleted" size={24} color="#888" />
                    <Text style={[styles.navText]}>Appointment</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Icon name="bell-outline" size={24} color="#888" />
                    <Text style={styles.navText}>Notifications</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Icon name="account" size={24} color="#888" />
                    <Text style={styles.navText}>Profile</Text>
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
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    messageContainer: {
        flex: 1,
        backgroundColor: '#e8f5e9',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
    },
    messageInput: {

        fontSize: 16,
    },
    continueButton: {
        backgroundColor: '#379137',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
    },
    continueButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        paddingVertical: 10,
    },
    navItem: {
        alignItems: 'center',
    },
    navText: {
        fontSize: 12,
        marginTop: 5,
        color: '#888',
    },
    activeNavText: {
        color: '#006B3E',
    },
});

export default AppointmentScreen;