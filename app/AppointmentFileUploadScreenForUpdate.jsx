import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';


const AppointmentFileUploadScreen = () => {
    const router = useRouter();
    const navigation = useNavigation();
    const route = useRoute();
    const { id, district, contact, textmessage } = route.params;
    const handleOpenFile = () => {
        // Implement file picker functionality here
        console.log('Open file picker');
    };

    const handleSkip = () => {
        if (id && district && contact && textmessage) {
            navigation.navigate('AppointmentSummaryScreenForUpdate', {
                id,
                district,
                contact,
                textmessage
            });
        } else {
            Alert.alert(
                "Error",
                "Something went wrong"
            );
        }
    };

    const handleContinue = () => {
        // Implement continue functionality
        console.log('Continue pressed');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.uploadContainer}>
                    <Icon name="cloud-upload" size={48} color="#379137" />
                    <Text style={styles.uploadText}>Upload your file</Text>
                </View>

                <TouchableOpacity style={styles.openFileButton} onPress={handleOpenFile}>
                    <Text style={styles.openFileButtonText}>Open file</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                    <Text style={styles.skipButtonText}>Skip</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                    <Text style={styles.continueButtonText}>Continue</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem} onPress={() => router.push('/HomeScreen')}>
                    <Icon name="home" size={24} color="#888" />
                    <Text style={styles.navText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => router.push('/AppointmentHistory')}>
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
        justifyContent: 'center',
    },
    uploadContainer: {
        backgroundColor: '#e8f5e9',
        borderRadius: 8,
        padding: 32,
        alignItems: 'center',
        marginBottom: 16,
    },
    uploadText: {
        marginTop: 8,
        fontSize: 16,
        color: '#379137',
        fontFamily: 'Poppins-Regular',
    },
    openFileButton: {
        backgroundColor: '#379137',  // Green button background
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginVertical: 10,
        height: 50,
        width: '100%',
        alignItems: 'center',

        // Shadow properties for iOS/web
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        // Shadow for Android (elevation)
        elevation: 5,
        marginBottom: 230,
    },
    openFileButtonText: {
        fontSize: 18,
        color: '#FFF',
        fontFamily: 'Poppins-SemiBold',
    },
    skipButton: {
        backgroundColor: '#FFF',  // Green button background
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginVertical: 10,
        height: 50,
        width: '100%',
        alignItems: 'center',

        // Shadow properties for iOS/web
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        // Shadow for Android (elevation)
        elevation: 5,
    },
    skipButtonText: {
        fontSize: 18,
        color: '#379137',
        fontFamily: 'Poppins-SemiBold',
    },
    continueButton: {
        backgroundColor: '#379137',  // Green button background
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginVertical: 10,
        height: 50,
        width: '100%',
        alignItems: 'center',

        // Shadow properties for iOS/web
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        // Shadow for Android (elevation)
        elevation: 5,
    },
    continueButtonText: {
        fontSize: 18,
        color: '#FFF',
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
        fontFamily: 'Poppins-Regular'
    },
    activeNavText: {
        color: '#006B3E',
        fontFamily: 'Poppins-Regular'
    },
});

export default AppointmentFileUploadScreen;