import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { API_URL } from '@env';
import axios from "axios";
import { useRouter } from 'expo-router';


const AppointmentHistory = () => {
    const router = useRouter();
    const [appointment, setAppointment] = useState([]);

useEffect(() => {
    async function fetchAppointments() {
      try {
        const response = await axios.post(
          `${API_URL}:5000/api/appoinments/getappointments`
        );
          setAppointment(response.data.appointments);
      } catch (error) {
        console.log(error);
      }

    }
    fetchAppointments();
  }, []);
    
    const appointments = [
        { date: '2024/09/13', id: 1 },
        { date: '2024/09/13', id: 2 },
        { date: '2024/09/13', id: 3 }
    ];

    const handleEdit = (id) => {
        console.log('Edit appointment with id:', id);
    };

    const handleDelete = (id) => {
        console.log('Delete appointment with id:', id);
    };

    const handleViewAppointment = (id) => {
        console.log('View appointment with id:', id);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>My Appointments</Text>
            <ScrollView style={styles.scrollView}>
                {appointments.map((appointment) => (
                    <View key={appointment.id} style={styles.appointmentContainer}>
                        <View style={styles.appointmentHeader}>
                            <Text style={styles.appointmentDate}>{appointment.date}</Text>
                            <TouchableOpacity onPress={() => handleEdit(appointment.id)}>
                                <Icon name="square-edit-outline" size={24} color="#000" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDelete(appointment.id)}>
                                <Icon name="close-circle-outline" size={24} color="#000" />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => handleViewAppointment(appointment.id)}>
                            <Text style={styles.viewButton}>View Appointment</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem} onPress={() => router.push('/HomeScreen')}>
                    <Icon name="home" size={24} color="#888" />
                    <Text style={styles.navText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Icon name="format-list-bulleted" size={24} color="#006B3E" />
                    <Text style={[styles.navText, styles.activeNavText]}>Appointment</Text>
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    scrollView: {
        marginBottom: 20,
    },
    appointmentContainer: {
        backgroundColor: '#E8F5E9',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    appointmentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    appointmentDate: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    viewButton: {
        fontSize: 16,
        color: '#006B3E',
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

export default AppointmentHistory;
