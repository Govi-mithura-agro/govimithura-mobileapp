import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const RecorderScreen = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [timer, setTimer] = useState(0);
    const [recordingPath, setRecordingPath] = useState(null);
    const [audioRecorderPlayer, setAudioRecorderPlayer] = useState(null);

    useEffect(() => {
        let interval = null;
        if (isRecording) {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer + 1);
            }, 1000);
        } else if (!isRecording && timer !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRecording, timer]);

    const formatTime = () => {
        const getSeconds = `0${timer % 60}`.slice(-2);
        const minutes = Math.floor(timer / 60);
        const getMinutes = `0${minutes % 60}`.slice(-2);
        const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

        return `${getHours}:${getMinutes}:${getSeconds}`;
    };

    const requestPermissions = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                ]);
                return granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        } else {
            return true; // iOS permissions are handled automatically
        }
    };

    const handleRecordButtonPress = async () => {
        try {
            const hasPermission = await requestPermissions();
            if (hasPermission) {
                if (!isRecording) {
                    const newAudioRecorderPlayer = new AudioRecorderPlayer();
                    setAudioRecorderPlayer(newAudioRecorderPlayer);
                    setIsRecording(true);
                    setTimer(0);
                    const result = await newAudioRecorderPlayer.startRecorder();
                    setRecordingPath(result);
                    newAudioRecorderPlayer.addRecordBackListener((e) => {
                        // You can use this to update UI with recording status if needed
                    });
                } else {
                    setIsRecording(false);
                    const result = await audioRecorderPlayer.stopRecorder();
                    audioRecorderPlayer.removeRecordBackListener();
                    console.log('Recording stopped, file saved to:', result);
                }
            } else {
                alert('Permission to access microphone is required to record audio.');
            }
        } catch (error) {
            console.error('Error in handleRecordButtonPress:', error);
            alert('An error occurred while trying to record. Please try again.');
        }
    };

    const handlePlayButtonPress = async () => {
        try {
            if (!isPlaying && recordingPath) {
                setIsPlaying(true);
                await audioRecorderPlayer.startPlayer(recordingPath);
                audioRecorderPlayer.addPlayBackListener((e) => {
                    if (e.currentPosition === e.duration) {
                        handleStopPlay();
                    }
                });
            } else {
                handleStopPlay();
            }
        } catch (error) {
            console.error('Error in handlePlayButtonPress:', error);
            alert('An error occurred while trying to play. Please try again.');
        }
    };

    const handleStopPlay = async () => {
        if (isPlaying && audioRecorderPlayer) {
            await audioRecorderPlayer.stopPlayer();
            audioRecorderPlayer.removePlayBackListener();
            setIsPlaying(false);
        }
    };

    const handleRetryButtonPress = () => {
        setRecordingPath(null);
        setTimer(0);
        setIsPlaying(false);
        if (audioRecorderPlayer) {
            audioRecorderPlayer.stopPlayer();
            audioRecorderPlayer.removePlayBackListener();
        }
        setAudioRecorderPlayer(null);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={styles.timerText}>{formatTime()}</Text>

                <TouchableOpacity
                    style={[styles.recordButton, isRecording && styles.recording]}
                    onPress={handleRecordButtonPress}
                >
                    <View style={styles.innerRecordButton} />
                </TouchableOpacity>

                {recordingPath && !isRecording && (
                    <View style={styles.actionButtons}>
                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={handlePlayButtonPress}
                        >
                            <Text style={styles.actionButtonText}>
                                {isPlaying ? 'Stop' : 'Play'}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={handleRetryButtonPress}
                        >
                            <Text style={styles.actionButtonText}>Retry</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem}>
                    <Icon name="home" size={24} color="#888" />
                    <Text style={styles.navText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
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
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E8F5E9',
        padding: 20,
        borderRadius: 10,
        margin: 20,
    },
    timerText: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 240,
    },
    recordButton: {
        backgroundColor: '#FF4B4B',
        borderRadius: 100,
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        height: 70,
    },
    innerRecordButton: {
        backgroundColor: '#FF4B4B',
        borderRadius: 100,
        width: 30,
        height: 30,
    },
    recording: {
        backgroundColor: '#FF0000',
    },
    actionButtons: {
        flexDirection: 'row',
        marginTop: 30,
    },
    actionButton: {
        backgroundColor: '#006B3E',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    actionButtonText: {
        color: '#fff',
        fontSize: 16,
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

export default RecorderScreen;
