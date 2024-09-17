import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import { Table, Row } from 'react-native-table-component';
import Modal from 'react-native-modal';
import { API_URL } from '@env';

const CropPrediction = () => {
    const [locations, setLocations] = useState([]);
    const [cropFactor, setCropFactor] = useState(null);
    const [crops, setCrops] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState("Colombo");
    const [selectedProvince, setSelectedProvince] = useState("Western");
    const [notFound, setNotFound] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedCrop, setSelectedCrop] = useState(null);

    useEffect(() => {
        // Fetch locations from the API
        const fetchLocations = async () => {
            try {
                const response = await axios.get(`${API_URL}:5000/api/locations`);
                setLocations(response.data);
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };
        fetchLocations();
    }, []);

    //Fetch crop factors for the default district (Colombo) and Fetch crops for the default province (Western)
    useEffect(() => {
        fetchCropFactorsAndCrops(selectedDistrict, selectedProvince);
    }, [selectedDistrict, selectedProvince]);

    //Function to fetch crop factors based on district and crops based on province
    const fetchCropFactorsAndCrops = (district, province) => {
        axios
            .get(`${API_URL}:5000/api/cropfactors/getcropfactors/${district}`)
            .then((response) => {
                if (response.data && response.data.cropfactor) {
                    setCropFactor(response.data.cropfactor);
                    setNotFound(false); //Reset the notFound state
                } else {
                    setCropFactor(null);
                    setNotFound(true); //Set notFound to true when no data is found
                }
            })
            .catch((error) => {
                console.error("Error fetching crop factors:", error);
                setCropFactor(null);
                setNotFound(true); //Set notFound to true when an error occurs
            });

        axios
            .get(`${API_URL}:5000/api/crops/getcropdata/${province}`)
            .then((response) => {
                if (response.data && response.data.crop) {
                    setCrops(response.data.crop);
                    setNotFound(false); //Reset the notFound state
                } else {
                    setCrops(null);
                }
            })
            .catch((error) => {
                console.error("Error fetching crops:", error);
                setCrops(null);
            });
    };

    const handleMarkerPress = (district, province) => {
        setSelectedDistrict(district);
        setSelectedProvince(province);
        fetchCropFactorsAndCrops(district, province);
    };

    const toggleModal = (crop) => {
        setSelectedCrop(crop);
        setModalVisible(!isModalVisible);
    };

    const renderCropFactorSection = (title, data) => (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{title}</Text>
            {Object.entries(data).map(([key, value]) => (
                <View key={key} style={styles.rowContainer}>
                    <Text style={styles.rowLabel}>{key}:</Text>
                    <Text style={styles.rowValue}>{value}</Text>
                </View>
            ))}
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 7.8731,
                        longitude: 80.7718,
                        latitudeDelta: 3,
                        longitudeDelta: 3,
                    }}
                >
                    {locations.map((location, index) => (
                        <Marker
                            key={index}
                            coordinate={{
                                latitude: location.coordinates[0],
                                longitude: location.coordinates[1],
                            }}
                            onPress={() => handleMarkerPress(location.district, location.province)}
                        />
                    ))}
                </MapView>
            </View>

            <View style={styles.contentContainer}>
                <Text style={styles.header}>Crop Factors for {selectedDistrict}</Text>

                {notFound ? (
                    <Text style={styles.notFoundText}>Data not found</Text>
                ) : cropFactor ? (
                    <>
                        {renderCropFactorSection("Soil Properties", {
                            "Soil Type": cropFactor.soiltype,
                            "Soil pH": cropFactor.soilph,
                            "Nutrient Content": cropFactor.nutrientcontent,
                        })}
                        {renderCropFactorSection("Weather Conditions", {
                            "Temperature": `${cropFactor.temperature} °C`,
                            "Rainfall": `${cropFactor.rainfall} mm`,
                            "Humidity": `${cropFactor.humidity} %`,
                        })}
                        {/* Add more sections as needed */}
                    </>
                ) : null}

                <Text style={styles.header}>Suitable Crops for {selectedDistrict}</Text>

                {crops && crops.length > 0 ? (
                    <View style={styles.tableContainer}>
                        <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                            <Row data={['Crop', 'Name', 'Scientific Name', 'Season']} style={styles.tableHeader} textStyle={styles.tableHeaderText} />
                            {crops.map((crop, index) => (
                                <TouchableOpacity key={index} onPress={() => toggleModal(crop)}>
                                    <Row
                                        data={[
                                            <Image source={{ uri: crop.crop[0] }} style={styles.cropImage} />,
                                            crop.cropName,
                                            crop.scientificName,
                                            crop.plantingSeason
                                        ]}
                                        style={index % 2 && styles.tableRowEven}
                                        textStyle={styles.tableRowText}
                                    />
                                </TouchableOpacity>
                            ))}
                        </Table>
                    </View>
                ) : null}
            </View>

            <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
                {selectedCrop && (
                    <View style={styles.modalContent}>
                        <Image source={{ uri: selectedCrop.crop[0] }} style={styles.modalImage} />
                        <Text style={styles.modalTitle}>{selectedCrop.cropName}</Text>
                        <Text style={styles.modalDescription}>{selectedCrop.description}</Text>
                        <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    mapContainer: {
        height: 300,
        marginBottom: 20,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    contentContainer: {
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    sectionContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#0c883d',
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    rowLabel: {
        fontSize: 16,
        color: '#333',
    },
    rowValue: {
        fontSize: 16,
        color: '#666',
    },
    notFoundText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
    tableContainer: {
        marginTop: 20,
    },
    tableHeader: {
        height: 50,
        backgroundColor: '#f1f8ff',
    },
    tableHeaderText: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
    tableRowEven: {
        backgroundColor: '#f9f9f9',
    },
    tableRowText: {
        textAlign: 'center',
        padding: 5,
    },
    cropImage: {
        width: 50,
        height: 50,
        resizeMode: 'cover',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalImage: {
        width: 150,
        height: 150,
        resizeMode: 'cover',
        borderRadius: 75,
        marginBottom: 15,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalDescription: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 15,
    },
    closeButton: {
        backgroundColor: '#0c883d',
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CropPrediction;