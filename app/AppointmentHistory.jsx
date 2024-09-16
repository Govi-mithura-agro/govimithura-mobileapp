import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Modal,
    Button,
    Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { API_URL } from "@env";
import axios from "axios";
import { useRouter } from "expo-router";

const AppointmentHistory = () => {
    const router = useRouter();
    const [appointment, setAppointment] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

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

    const handleEdit = (id) => {
        console.log("Edit appointment with id:", id);
    };

    const handleDelete = (id) => {
        console.log("Delete appointment with id:", id);
    };

    const handleViewAppointment = (appointment) => {
        setSelectedAppointment(appointment); // Set selected appointment
        setModalVisible(true); // Show modal
    };

    const closeModal = () => {
        setModalVisible(false); // Close modal
    };
    const CancelAppointment = (id) => {
        // Show confirmation alert before cancelling
        Alert.alert(
            "Cancel Appointment",
            "Are you sure you want to cancel this appointment?",
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                },
                {
                    text: "Yes",
                    onPress: async () => {
                        try {
                            await axios.put(
                                `${API_URL}:5000/api/appoinments/cancelappointment/${id}`
                            );
                            // Refresh appointments after cancelling
                            const response = await axios.post(
                                `${API_URL}:5000/api/appoinments/getappointments`
                            );
                            setAppointment(response.data.appointments);
                            closeModal();
                        } catch (error) {
                            console.log("Error cancelling appointment", error);
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };

    // Function to get status color
    const getStatusColor = (status) => {
        switch (status) {
            case "Solved":
                return "#4CAF50"; // Green
            case "Pending":
                return "#FFC107"; // Amber
            case "Unsolved":
                return "#FF5722"; // Orange
            case "Rejected":
                return "#F44336"; // Red
            case "Cancelled":
                return "#9E9E9E"; // Gray
            default:
                return "#000"; // Black for unknown status
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>My Appointments</Text>
            <ScrollView style={styles.scrollView}>
                {appointment.map((appointment) => (
                    <View key={appointment.id} style={styles.appointmentContainer}>
                        <View style={styles.appointmentHeader}>
                            <Text style={styles.appointmentDate}>{appointment.date}</Text>
                            {appointment.status === "Pending" && (
                                <TouchableOpacity
                                    onPress={() => handleEdit(appointment.id)}
                                    style={styles.appointmentEditButton}
                                >
                                    <Icon name="square-edit-outline" size={24} color="#000" />
                                </TouchableOpacity>
                            )}
                            <TouchableOpacity onPress={() => handleDelete(appointment.id)}>
                                <Icon name="close-circle-outline" size={24} color="#000" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.appointmentTime}>{appointment.time}</Text>
                        <TouchableOpacity
                            onPress={() => handleViewAppointment(appointment)}
                        >
                            <Text style={styles.viewButton}>View Appointment</Text>
                        </TouchableOpacity>
                        <Text
                            style={[
                                styles.status,
                                { color: getStatusColor(appointment.status) },
                            ]}
                        >
                            {appointment.status}
                        </Text>
                    </View>
                ))}
            </ScrollView>

            {selectedAppointment && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={closeModal}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Appointment Details</Text>
                            <Text>Name: {selectedAppointment.name}</Text>
                            <Text>Email: {selectedAppointment.email}</Text>
                            <Text>Contact: {selectedAppointment.contact}</Text>
                            <Text>District: {selectedAppointment.district}</Text>
                            <Text>Voice message: {selectedAppointment.voicemessage}</Text>
                            <Text>Text message: {selectedAppointment.textmessage}</Text>
                            <Text>Uploaded: {selectedAppointment.file}</Text>
                            <Text>Date: {selectedAppointment.date}</Text>
                            <Text>Time: {selectedAppointment.time}</Text>
                            <Text
                                style={[
                                    styles.status,
                                    { color: getStatusColor(selectedAppointment.status) },
                                ]}
                            >
                                {selectedAppointment.status}
                            </Text>
                            {selectedAppointment.status === "Pending" && (
                                <Button
                                    title="Cancel Appointment"
                                    onPress={() => CancelAppointment(selectedAppointment._id)}
                                    color={"white"}
                                    marginTop="10px"
                                />
                            )}
                            <Text></Text>
                            <Button title="Close" onPress={closeModal} color={"#006B3E"} />
                        </View>
                    </View>
                </Modal>
            )}

            <View style={styles.bottomNav}>
                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => router.push("/HomeScreen")}
                >
                    <Icon name="home" size={24} color="#888" />
                    <Text style={styles.navText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Icon name="format-list-bulleted" size={24} color="#006B3E" />
                    <Text style={[styles.navText, styles.activeNavText]}>
                        Appointment
                    </Text>
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
        backgroundColor: "#fff",
        padding: 20,
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        marginTop: 20,
    },
    scrollView: {
        marginBottom: 20,
    },
    appointmentContainer: {
        backgroundColor: "#E8F5E9",
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    appointmentHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 0,
    },
    appointmentDate: {
        fontSize: 20,
        fontWeight: "bold",
    },
    appointmentTime: {
        fontSize: 12,
        marginBottom: 10,
    },
    appointmentEditButton: {
        marginLeft: -80,
    },
    viewButton: {
        fontSize: 16,
        color: "#006B3E",
    },
    cancelAppointmentButton: {
        color: "white",
        marginTop: 20
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        alignItems: "left",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    bottomNav: {
        flexDirection: "row",
        justifyContent: "space-around",
        borderTopWidth: 1,
        borderTopColor: "#E0E0E0",
        paddingVertical: 10,
    },
    navItem: {
        alignItems: "center",
    },
    navText: {
        fontSize: 12,
        marginTop: 5,
        color: "#888",
    },
    activeNavText: {
        color: "#006B3E",
    },
    status: {
        fontSize: 14,
        marginTop: 5,
        fontWeight: "bold",
    },
});

export default AppointmentHistory;
