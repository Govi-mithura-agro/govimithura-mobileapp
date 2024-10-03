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
    const [crops, setCrops] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState("Colombo");
    const [selectedProvince, setSelectedProvince] = useState("Western");
    const [notFound, setNotFound] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedCrop, setSelectedCrop] = useState(null);

    useEffect(() => {
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

    useEffect(() => {
        fetchCropFactorsAndCrops(selectedDistrict, selectedProvince);
    }, [selectedDistrict, selectedProvince]);

    const fetchCropFactorsAndCrops = (district, province) => {
        axios
            .get(`${API_URL}:5000/api/cropfactors/getcropfactors/${district}`)
            .then((response) => {
                if (response.data && response.data.cropfactor) {
                    setCropFactor(response.data.cropfactor);
                    setNotFound(false);
                } else {
                    setCropFactor(null);
                    setNotFound(true);
                }
            })
            .catch((error) => {
                console.error("Error fetching crop factors:", error);
                setCropFactor(null);
                setNotFound(true);
            });

        axios
            .get(`${API_URL}:5000/api/crops/getcropdata/${province}`)
            .then((response) => {
                if (response.data && response.data.crop) {
                    setCrops(response.data.crop);
                    setNotFound(false);
                } else {
                    setCrops([]);
                }
            })
            .catch((error) => {
                console.error("Error fetching crops:", error);
                setCrops([]);
            });
    };

    const handleMarkerPress = (district, province) => {
        setSelectedDistrict(district);
        setSelectedProvince(province);
        fetchCropFactorsAndCrops(district, province);
    };

    const toggleModal = (crop) => {
        if (isModalVisible) {
            setModalVisible(false);
            // Delay clearing the selected crop to avoid undefined error
            setTimeout(() => setSelectedCrop(null), 300);
        } else {
            setSelectedCrop(crop);
            setModalVisible(true);
        }
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
                        {renderCropFactorSection("Geographical Factors", {
                            "Altitude": `${cropFactor.altitude} m`,
                            "Topography": `${cropFactor.topography}`,
                        })}
                        {renderCropFactorSection("Water Availability", {
                            "Irrigation Systems": `${cropFactor.irrigationsystems}`,
                            "Water Quality": `${cropFactor.waterquality}`,
                        })}
                        {renderCropFactorSection("Crop Type", {
                            "Variety Selection": `${cropFactor.varietyselection}`,
                            "Growth Cycle": `${cropFactor.growthcycle}`,
                        })}
                        {renderCropFactorSection("Pests and Diseases", {
                            "Pest Pressure": `${cropFactor.pestpressure}`,
                            "Disease Incidence": `${cropFactor.diseaseincidence}`,
                        })}
                        {renderCropFactorSection("Farming Practices", {
                            "Crop Rotation ": `${cropFactor.croprotation}`,
                            "Fertilizer Use": `${cropFactor.fertilizeruse}`,
                        })}
                        {/* Add more sections as needed */}
                    </>
                ) : null}

                <Text style={styles.header}>Suitable Crops for {selectedDistrict}</Text>

                {crops && crops.length > 0 ? (
                    <View style={styles.tableContainer}>
                        <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                            <Row data={['Crop', 'Name', 'Season', 'Soil Type', 'Growth Duration (days)', 'Average Yield (tons/ha)', 'Water Requirements']} style={styles.tableHeader} textStyle={styles.tableHeaderText} />
                            {crops.map((crop, index) => (
                                <TouchableOpacity key={index} onPress={() => toggleModal(crop)}>
                                    <Row
                                        data={[
                                            <Image source={{ uri: crop.crop[0] }} style={styles.cropImage} />,
                                            crop.cropName,
                                            crop.plantingSeason,
                                            crop.soilType,
                                            crop.growthDuration,
                                            crop.averageYield,
                                            crop.waterRequirements,
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

            {/* Modal */}
            <Modal isVisible={isModalVisible} onBackdropPress={() => toggleModal()}>
                {selectedCrop && (
                    <View style={styles.modalContent}>
                        <Image source={{ uri: selectedCrop.crop[0] }} style={styles.modalImage} />
                        <Text style={styles.modalTitle}>{selectedCrop.cropName}</Text>
                        <Text style={styles.modalDescription}>{selectedCrop.description}</Text>
                        <TouchableOpacity onPress={() => toggleModal()} style={styles.closeButton}>
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
        backgroundColor: '#FFF',
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
        fontFamily: 'Poppins-SemiBold',
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
        fontFamily: 'Poppins-SemiBold',
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
        fontFamily: 'Poppins-Regular',
    },
    rowValue: {
        fontSize: 16,
        color: '#666',
        fontFamily: 'Poppins-SemiBold',
    },
    notFoundText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
        fontFamily: 'Poppins-Regular',
    },
    tableContainer: {
        marginTop: 20,
    },
    tableHeader: {
        height: 50,
        backgroundColor: '#e7ffe7',
        borderRadius: 10,
    },
    tableHeaderText: {
        textAlign: 'center',
        fontFamily: 'Poppins-SemiBold',
    },
    tableRowEven: {
        backgroundColor: '#f9f9f9',
    },
    tableRowText: {
        textAlign: 'center',
        padding: 5,
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
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
        fontFamily: 'Poppins-SemiBold',
        marginBottom: 10,
    },
    modalDescription: {
        fontSize: 10,
        textAlign: 'justify',
        marginBottom: 15,
        fontFamily: 'Poppins-Regular',
    },
    closeButton: {
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
    closeButtonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
    },
});

export default CropPrediction;