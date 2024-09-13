import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import { Link } from "@react-navigation/native";

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
const InfoCard = ({ title, description }) => (
    <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>{title}</Text>
        <Text style={styles.infoDescription}>{description}</Text>
    </View>
);

const HomeScreen = () => {
    const router = useRouter();
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.welcomeText}>Welcome</Text>
                        <Text style={styles.userName}>Abhishek Peiris</Text>
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
                    title="How to bla bla bla bla bla ?"
                    description="How do you choose suitable crops for your area"
                />
                <InfoCard
                    title="How to bla bla bla bla bla ?"
                    description="How do you choose suitable crops for your area"
                />
            </ScrollView>

            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem}>
                    <Icon name="home" size={24} color="#379137" />
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
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
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
        width: 50,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#379137',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },
    categoryTitle: {
        fontSize: 12,
        textAlign: 'center',
    },
    infoCard: {
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    infoDescription: {
        fontSize: 14,
        color: '#666',
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
});

export default HomeScreen;