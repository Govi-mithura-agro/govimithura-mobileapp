import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert, ScrollView } from 'react-native';
import { useFocusEffect, useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import { API_URL } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';

const UpdateUserDetails = () => {
    const navigation = useNavigation();
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState("");
    const [errorpassword, setErrorPassword] = useState("");
    const [emailError, setEmailError] = useState("");

    const [userID, setUserID] = useState(null);
    

    useFocusEffect(
        useCallback(() => {
            getUserDetails();
        }, []) 
    );

    const getUserDetails = async () => {
        try {
            const userDetailsString = await AsyncStorage.getItem('userDetails');
            if (userDetailsString) {
                setName(JSON.parse(userDetailsString).name);
                setEmail(JSON.parse(userDetailsString).email);
                setContact(JSON.parse(userDetailsString).contact);
                setPassword(JSON.parse(userDetailsString).password);
                setConfirmPassword(JSON.parse(userDetailsString).password);

                setUserID(JSON.parse(userDetailsString)._id);
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    async function updateUser(id) {

        if (password !== confirmPassword) {
            setErrorPassword('Passwords do not match');
            return;
        }
        setErrorPassword("");

        if (!name || !email || !contact || !password) {
            Alert.alert('Warning', 'Please fill in all required fields');
            return;
        }

        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address');
            return;
        }
        setEmailError("");

        if (name && email && contact && password) {
            const numericValue = contact.replace(/[^0-9]/g, "");
            if (!numericValue.startsWith("07")) {
                setError('Phone number must start with "07"');
                return;
            }
            if (numericValue.length !== 10) {
                setError("Phone number should be exactly 10 digits");
                return;
            }
            setContact(numericValue);
            setError("");
        } else {
            Alert.alert("Warning", "Please fill in all required fields");
        }

        try {
            const response = await axios.put(`${API_URL}:5000/api/appuser/edituser/${id}`, {
                name: name,
                email: email,
                contact: contact,
                password: password
            });

            if (response.status === 200) {
                const userDetails = {
                    _id: id,
                    name: name,
                    email: email,
                    contact: contact,
                    password: password
                }

                await AsyncStorage.setItem('userDetails', JSON.stringify(userDetails));

                Alert.alert(
                    "Success",
                    "User details updated successfully",
                    [
                        {
                            text: "OK",
                            onPress: () => navigation.navigate('UserProfileScreen', { refresh: true })
                        }
                    ]
                );
            }
        } catch (error) {
            console.error("Error updating user details:", error);
            Alert.alert("Error", "Failed to update user details. Please try again.");
        }
    }


    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.content}>

                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="E-mail"
                        value={email}
                        onChangeText={(text) => {
                            setEmail(text);
                            setEmailError("");
                        }}
                        keyboardType="email-address"
                    />
                    {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                    <View style={styles.phoneInput}>
                       
                        <TextInput
                            style={styles.phoneNumber}
                            placeholder="Phone number"
                            keyboardType="phone-pad"
                            maxLength={10}
                            value={contact}
                            onChangeText={setContact}
                        />
                        
                    </View>
                    {error ? <Text style={styles.errorText}>{error}</Text> : null}
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    {errorpassword ? <Text style={styles.errorText}>{errorpassword}</Text> : null}

                    <TouchableOpacity style={styles.signUpButton} onPress={() => updateUser(userID)}>
                        <Text style={styles.signUpButtonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    scrollViewContent: {
        flexGrow: 1,
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
    signUpButton: {
        backgroundColor: '#379137',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginVertical: 10,
        height: 50,
        width: '100%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
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
    errorText: {
        color: "red",
        marginTop: -15,
        marginBottom: 10,
        fontFamily: 'Poppins-Regular'
    },
});

export default UpdateUserDetails;