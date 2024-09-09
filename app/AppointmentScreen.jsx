import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DropdownInput = ({ label, placeholder }) => (
    <TouchableOpacity style={styles.dropdownInput}>
        <Text style={styles.inputLabel}>{label}</Text>
        <View style={styles.dropdownContent}>
            <Text style={styles.placeholderText}>{placeholder}</Text>
            <Icon name="chevron-down" size={24} color="#888" />
        </View>
    </TouchableOpacity>
);

const AppointmentScreen = () => {
    const [phoneNumber, setPhoneNumber] = useState('+94 XXXXXXXX');

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.formContainer}>
                    <Text style={styles.formTitle}>Fill Your Issue</Text>

                    <DropdownInput label="District" placeholder="Select District" />
                    <DropdownInput label="Divisional Secretarial Region" placeholder="Select Region" />
                    <DropdownInput label="Grama Niladhari Division" placeholder="Select Division" />
                    <DropdownInput label="Type of Appointment" placeholder="Select Type" />

                    <View style={styles.phoneInputContainer}>
                        <TextInput
                            style={styles.phoneInput}
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            keyboardType="phone-pad"
                        />
                    </View>
                </View>

                <TouchableOpacity style={styles.continueButton}>
                    <Text style={styles.continueButtonText}>Continue</Text>
                </TouchableOpacity>
            </ScrollView>

            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem}>
                    <Icon name="home" size={24} color="#888" />
                    <Text style={styles.navText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Icon name="format-list-bulleted" size={24} color="#006B3E" />
                    <Text style={[styles.navText, styles.activeNavText]}>Appointment</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Icon name="bell-outline" size={24} color="#888" />
                    <Text style={styles.navText}>Notification</Text>
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
    scrollContent: {
        padding: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    formContainer: {
        backgroundColor: '#E8F5E9',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
    },
    formTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    dropdownInput: {
        marginBottom: 15,
    },
    inputLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    dropdownContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
    },
    placeholderText: {
        color: '#888',
    },
    phoneInputContainer: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
    },
    phoneInput: {
        fontSize: 16,
    },
    continueButton: {
        backgroundColor: '#379137',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    continueButtonText: {
        color: 'white',
        fontSize: 16,
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