import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const UserProfileScreen = () => {
    const router = useRouter();
    const [userDetails, setUserDetails] = useState(null);

    const getUserDetails = useCallback(async () => {
        try {
            const userDetailsString = await AsyncStorage.getItem('userDetails');
            if (userDetailsString) {
                setUserDetails(JSON.parse(userDetailsString));
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            getUserDetails();
        }, [getUserDetails])
    );

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('userDetails');
            router.replace('/WelcomeScreen');
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    if (!userDetails) {
        return <View style={styles.container}><Text>Loading...</Text></View>;
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Image
                        source={{ uri: userDetails.profilePicture || 'https://via.placeholder.com/150' }}
                        style={styles.profilePicture}
                    />
                    <Text style={styles.name}>{userDetails.name}</Text>
                    <Text style={styles.email}>{userDetails.email}</Text>
                </View>

                <View style={styles.infoCard}>
                    <View style={styles.infoRow}>
                        <Icon name="phone" size={24} color="#379137" />
                        <Text style={styles.infoText}>{userDetails.contact}</Text>
                    </View>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>12</Text>
                        <Text style={styles.statLabel}>Appointments</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>5</Text>
                        <Text style={styles.statLabel}>Predictions</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>8</Text>
                        <Text style={styles.statLabel}>Lands</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.editButton} onPress={() => router.push('/UpdateUserDetails')}>
                    <Text style={styles.editButtonText}>Edit Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.deleteaccuntlink}>
                    <Text style={styles.deleteaccuntlinkText}>Delete account</Text>
                </TouchableOpacity>
            </ScrollView>


            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem}>
                    <Icon name="home" size={24} color="#888" onPress={() => router.push('/HomeScreen')} />
                    <Text style={styles.navText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => router.push('/AppointmentHistory')}>
                    <Icon name="format-list-bulleted" size={24} color="#888" />
                    <Text style={styles.navText}>Appointment</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Icon name="bell-outline" size={24} color="#888" />
                    <Text style={styles.navText}>Notification</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Icon name="account" size={24} color="#379137" onPress={() => router.push('/UserProfileScreen')} />
                    <Text style={styles.navText}>Profile</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },
    scrollContent: {
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profilePicture: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 10,
    },
    name: {
        fontSize: 24,
        fontFamily: 'Poppins-SemiBold',
        color: '#333',
    },
    email: {
        fontSize: 16,
        color: '#666',
        fontFamily: 'Poppins-Regular',
    },
    infoCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    infoText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#333',
        fontFamily: 'Poppins-Regular',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statNumber: {
        fontSize: 24,
        fontFamily: 'Poppins-SemiBold',
        color: '#379137',
    },
    statLabel: {
        fontSize: 14,
        color: '#666',
        fontFamily: 'Poppins-Regular',
    },
    editButton: {
        backgroundColor: '#379137',
        padding: 15,
        borderRadius: 10,
        fontSize: 16,
        marginBottom: 20,
        borderColor: '#DDD',
        borderWidth: 1,
        fontFamily: 'Poppins-Regular',
        alignItems: 'center',

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        // Shadow for Android (elevation)
        elevation: 5,
    },
    editButtonText: {
        fontSize: 18,
        color: '#FFF',
        fontFamily: 'Poppins-SemiBold',
    },
    logoutButton: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#379137',
    },
    logoutButtonText: {
        fontSize: 18,
        color: '#379137',
        fontFamily: 'Poppins-SemiBold',
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
        fontFamily: 'Poppins-Regular',
    },
    deleteaccuntlink: {
        marginTop: 20,
    },
    deleteaccuntlinkText:{
        fontSize: 16,
        color: 'red',
        fontFamily: 'Poppins-SemiBold',
        textAlign: 'center',
        marginBottom: 10,
        textDecorationLine: 'underline',
    }
});

export default UserProfileScreen;