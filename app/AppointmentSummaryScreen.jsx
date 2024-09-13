import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, ScrollView, Alert } from 'react-native'; // Import Alert here
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from "axios";
import NavBar from "./NavBar";

const AppointmentSummaryScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { district, phone, message } = route.params;
    const [name, setName] = useState('Abhishek Peiris');
    const [email, setEmail] = useState('abhisheklpeiris@gmail.com');

    const summaryData = {
        Name: name,
        Email: email,
        Contact: phone,
        District: district,
        Message: message
    };

    const attachments = [
        // { name: '67x28a077639.mp3', size: '00:04:53' },
        // { name: '87x28ag7064u4.png', size: '39 KB' },
    ];

    async function addAppointment() {
        try {
            const response = await axios.post("http://192.168.43.196:5000/api/appoinments/addappointment", { // Replace localhost with your IP
                name: name,
                email: email,
                contact: phone,
                district: district,
                textmessage: message
            });

            if (response.status === 200) {
                Alert.alert(
                    "Success",
                    "Appointment added successfully",
                    [
                        {
                            text: "OK",
                            onPress: () => navigation.navigate('AppointmentHistory'),
                        }
                    ]
                );
                
            }
        } catch (error) {
            console.error("Error adding appointment:", error);
            Alert.alert("Error", "Failed to add appointment. Please try again.");
        }
    }


    const renderSummaryItem = (label, value) => (
        <View style={styles.summaryItem} key={label}>
            <Text style={styles.summaryLabel}>{label}</Text>
            <Text style={styles.summaryValue}>{value}</Text>
        </View>
    );

    const renderAttachment = (attachment, index) => (
        <View style={styles.attachmentItem} key={index}>
            <Icon2 name={attachment.name.endsWith('.mp3') ? 'audio-file' : 'image'} size={24} color="#000" />
            <View style={styles.attachmentDetails}>
                <Text style={styles.attachmentName}>{attachment.name}</Text>
                <Text style={styles.attachmentSize}>{attachment.size}</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.content}>
                <View style={styles.summaryContainer}>
                    <Text style={styles.summaryTitle}>Summary</Text>
                    {Object.entries(summaryData).map(([label, value]) => renderSummaryItem(label, value))}
                    {attachments.map(renderAttachment)}
                </View>

                <TouchableOpacity style={styles.submitButton} onPress={addAppointment}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </ScrollView>

            <NavBar />
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
    summaryContainer: {
        backgroundColor: '#e8f5e9',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
    },
    summaryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    summaryItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    summaryLabel: {
        color: '#666',
    },
    summaryValue: {
        fontWeight: 'bold',
    },
    attachmentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    attachmentDetails: {
        marginLeft: 8,
    },
    attachmentName: {
        fontWeight: 'bold',
    },
    attachmentSize: {
        color: '#666',
        fontSize: 12,
    },
    submitButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    activeNavText: {
        color: '#006B3E',
    },
});

export default AppointmentSummaryScreen;
