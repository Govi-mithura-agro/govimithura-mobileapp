import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AppointmentScreen = () => {
    const [message, setMessage] = useState('');

    return (
        <SafeAreaView style={styles.container}>
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

                <TouchableOpacity style={styles.continueButton}>
                    <Text style={styles.continueButtonText}>Continue</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerItem}>
                    <Icon name="home" size={24} color="#888" />
                    <Text style={styles.footerText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerItem}>
                    <Icon name="list" size={24} color="#4CAF50" />
                    <Text style={[styles.footerText, styles.activeFooterText]}>Appointments</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerItem}>
                    <Icon name="notifications" size={24} color="#888" />
                    <Text style={styles.footerText}>Notifications</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerItem}>
                    <Icon name="person" size={24} color="#888" />
                    <Text style={styles.footerText}>Profile</Text>
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
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        paddingVertical: 8,
    },
    footerItem: {
        alignItems: 'center',
    },
    footerText: {
        fontSize: 12,
        color: '#888',
        marginTop: 4,
    },
    activeFooterText: {
        color: '#4CAF50',
    },
});

export default AppointmentScreen;