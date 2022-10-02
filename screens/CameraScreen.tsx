import { Ionicons } from '@expo/vector-icons';
import { Camera, CameraType } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';

const CameraScreen = () => {
    const [type, setType] = useState<CameraType>(CameraType.back);
    const [hasPermission, setHasPermission] =
        Camera.useCameraPermissions(undefined);

    const cameraRef: any = useRef(null);

    const toggleCameraType = () => {
        setType((current) =>
            current === CameraType.back ? CameraType.front : CameraType.back
        );
    };

    useEffect(() => {
        (async () => {
            const { granted } = await Camera.requestCameraPermissionsAsync();
            console.log(granted);

            setHasPermission();
        })();
    }, []);

    if (!hasPermission) {
        return <View />;
    }

    if (!hasPermission.granted) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={type} ref={cameraRef}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={toggleCameraType}
                    >
                        <View>
                            <Ionicons
                                name={
                                    type === CameraType.front
                                        ? 'md-reload-outline'
                                        : 'refresh-outline'
                                }
                                size={32}
                                color="white"
                                style={styles.icon}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </Camera>

            <View>
                <Button
                    title="Take a picture"
                    onPress={async () => {
                        const pictureMetadata =
                            await cameraRef.current.takePictureAsync();

                        console.log('pictureMetadata', pictureMetadata);
                        console.log(
                            'resize',

                            await ImageManipulator.manipulateAsync(
                                pictureMetadata.uri,
                                [{ resize: { width: 800 } }]
                            )
                        );
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    camera: {
        flex: 1,
    },
    icon: {
        margin: 16,
    },
    buttonContainer: {
        alignItems: 'flex-end',
    },
    button: {},
    cameraTop: {},
});

export default CameraScreen;
