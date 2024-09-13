import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const districts = [
    'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo',
    'Galle', 'Gampaha', 'Hambantota', 'Jaffna', 'Kalutara',
    'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala', 'Mannar',
    'Matale', 'Matara', 'Moneragala', 'Mullaitivu', 'Nuwara Eliya',
    'Polonnaruwa', 'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya'
];

const DropdownInput = ({ label, selectedValue, onValueChange }) => (
    <View style={styles.dropdownInput}>
        <Text style={styles.inputLabel}>{label}</Text>
        <View style={styles.dropdownContent}>
            <Picker
                selectedValue={selectedValue}
                style={styles.picker}
                onValueChange={(itemValue) => onValueChange(itemValue)}
            >
                <Picker.Item label="Select District" value="" />
                {districts.map((district) => (
                    <Picker.Item label={district} value={district} key={district} />
                ))}
            </Picker>
        </View>
    </View>
);

const AppointmentScreen = () => {
    const navigation = useNavigation();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [district, setDistrict] = useState("");
    const [error, setError] = useState('');

    const handleContinue = () => {
        if (district && phoneNumber) {
            // Remove any non-numeric characters
            const numericValue = phoneNumber.replace(/[^0-9]/g, '');
            // Ensure it starts with "07"
            if (!numericValue.startsWith("07")) {
                setError('Phone number must start with "07"');
                return;
            }
            if (numericValue.length > 10) {
                setError('Phone number should be exactly 10 digits');
                return;
            }
            // Update phone number and validate length
            if (numericValue.length < 10) {
                setError('Phone number should be 10 digits');
                return;
            }
            if (numericValue.startsWith("07") && numericValue.length === 10) {
                setPhoneNumber(numericValue);
                setError(''); // Clear error if valid
                navigation.navigate('AppointmentVoiceTextScreen', {
                    district,
                    phone: phoneNumber
                });
            }

        } else {
            console.log("Please select a district and enter a phone number");
            Alert.alert("Warning", "Please select a district and enter a phone number");
        }
    };
    
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.formContainer}>
                    <Text style={styles.formTitle}>Fill Your Issue</Text>

                    <DropdownInput
                        selectedValue={district}
                        onValueChange={(value) => setDistrict(value)}
                    />

                    <View style={styles.phoneInputContainer}>
                        <TextInput
                            placeholder="07XXXXXXXX"
                            style={styles.phoneInput}
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            keyboardType="phone-pad"
                            maxLength={10} // Limit to 10 characters
                        />
                    </View>
                    {error ? <Text style={styles.errorText}>{error}</Text> : null}
                </View>

                <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                    <Text style={styles.continueButtonText}>Continue</Text>
                </TouchableOpacity>
            </ScrollView>

            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem}>
                    <Icon name="home" size={24} color="#888" />
                    <Text style={styles.navText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Icon name="format-list-bulleted" size={24} color="#888" />
                    <Text style={styles.navText}>Appointment</Text>
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
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    picker: {
        height: 50,
        width: '100%',
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
    errorText: {
        color: 'red',
        marginTop: 5,
    }
});

export default AppointmentScreen;
