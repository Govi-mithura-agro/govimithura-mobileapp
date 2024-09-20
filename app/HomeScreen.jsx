import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Image, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CategoryItem = ({ icon, title, route }) => {
    const router = useRouter();
    return (
        <TouchableOpacity style={styles.categoryItem} onPress={() => router.push(route)}>
            <View style={styles.categoryIcon}>
                <Icon name={icon} size={24} color="#fff" />
            </View>
            <Text style={styles.categoryTitle}>{title}</Text>
        </TouchableOpacity>
    );
};

const InfoCard = ({ title, description, videoId }) => (
    <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>{title}</Text>
        <Text style={styles.infoDescription}>{description}</Text>
        {videoId && (
            <TouchableOpacity onPress={() => Linking.openURL(`https://www.youtube.com/watch?v=${videoId}`)}>
                <Image
                    source={{ uri: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` }}
                    style={styles.thumbnail}
                />
            </TouchableOpacity>
        )}
    </View>
);

const HomeScreen = () => {
    const router = useRouter();
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const getUserDetails = async () => {
            try {
                const userDetailsString = await AsyncStorage.getItem('userDetails');
                if (userDetailsString) {
                    const userDetails = JSON.parse(userDetailsString);
                    setUserName(userDetails.name);
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        getUserDetails();
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.welcomeText}>Welcome</Text>
                        <Text style={styles.userName}>{userName}</Text>
                    </View>
                    <TouchableOpacity>
                        <Icon name="bell-outline" size={24} color="#000" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.sectionTitle}>Category</Text>
                <View style={styles.categoryContainer}>
                    <CategoryItem icon="sprout" title="Crops Prediction" route="CropPrediction" />
                    <CategoryItem icon="map-marker" title="Land Measure" route="LandMeasureScreen" />
                    <CategoryItem icon="calendar-clock" title="Appointment" route="AppointmentScreen" />
                    <CategoryItem icon="newspaper" title="News" route="NewsScreen" />
                </View>

                <InfoCard
                    title="How to Use Drone Technology for Agriculture?"
                    description="20 acres per hour is the latest way of applying fertilizers and medicines in Sri Lanka."
                    videoId="O-ELyhSNct4" // Replace with the YouTube video ID
                />
                <InfoCard
                    title="How to Use Drone Technology for Agriculture?"
                    description="Five minutes to the acre! - Fertilizer spraying sky inside the tunnel."
                    videoId="TpPxwWdOqmM" // Replace with the YouTube video ID
                />
                <InfoCard
                    title="Greenhouse Technology & Modernized Agriculture Training"
                    description="Let's learn greenhouse technology correctly!"
                    videoId="fkbTl1AoRSs" // Replace with the YouTube video ID
                />
                <InfoCard
                    title="Speech of Mr. Rohana Gamage, Project Director of World Bank Agriculture Sector Modernization Project"
                    description="The World Bank's Agriculture Sector Modernization Project is a project that will benefit the entire country."
                    videoId="fGKjXHYVtzc" // Replace with the YouTube video ID
                />
                <InfoCard
                    title="Let's know exactly before building a greenhouse"
                    description="Before making your own Polytunnel Greenhouse."
                    videoId="0wT-0LECQks" // Replace with the YouTube video ID
                />

            </ScrollView>

            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem}>
                    <Icon name="home" size={24} color="#379137" />
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
                    <Icon name="account" size={24} color="#888" onPress={() => router.push('/UserProfileScreen')} />
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    welcomeText: {
        fontSize: 16,
        color: '#888',
        marginTop: 10,
        fontFamily: 'Poppins-Regular',
    },
    userName: {
        fontSize: 20,
        fontFamily: 'Poppins-SemiBold',
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold',
        marginBottom: 10,
    },
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    categoryItem: {
        alignItems: 'center',
    },
    categoryIcon: {
        width: 65,
        height: 65,
        borderRadius: 10,
        backgroundColor: '#379137',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },
    categoryTitle: {
        fontSize: 10,
        textAlign: 'center',
        fontFamily: 'Poppins-Regular',
    },
    infoCard: {
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
    },
    infoTitle: {
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
        marginBottom: 5,
    },
    infoDescription: {
        fontSize: 12,
        color: '#666',
        fontFamily: 'Poppins-Regular',
    },
    thumbnail: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginTop: 10,
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
});

export default HomeScreen;
