// @ts-nocheck

import { useEffect, useState } from 'react';
import * as FileSystem from 'expo-file-system';
import singleFileUploader from 'single-file-uploader';
import Constants from 'expo-constants';
import { Alert, Button, FlatList, Image, StyleSheet, Text } from 'react-native';
import AlertUpload from '../utils/alert';

const ImagesScreen = () => {
    const [imagesList, setImagesList] = useState<string[]>([]);
    const [isRefresh, setIsRefresh] = useState<boolean>(false);

    const fetchImages = () => {
        (async () => {
            const images = await FileSystem.readDirectoryAsync(
                (FileSystem.cacheDirectory as string) + 'ImageManipulator'
            );

            setImagesList(images);
        })();
    };

    const handleRefresh = () => {
        setIsRefresh(true);
        fetchImages();

        setTimeout(() => {
            setIsRefresh(false);
        }, 3000);
    };

    useEffect(() => {
        fetchImages();
    }, []);

    return (
        <>
            {imagesList.length > 0 ? (
                <FlatList
                    data={imagesList}
                    keyExtractor={(imageData) => imageData}
                    onRefresh={handleRefresh}
                    refreshing={isRefresh}
                    renderItem={(itemData) => {
                        return (
                            <>
                                <Image
                                    style={styles.image}
                                    source={{
                                        uri:
                                            FileSystem.cacheDirectory +
                                            'ImageManipulator/' +
                                            itemData.item,
                                    }}
                                />

                                <Button
                                    title="upload"
                                    onPress={async () => {
                                        try {
                                            // await singleFileUploader({
                                            //     distantUrl:
                                            //         'https://wildstagram.nausicaa.wilders.dev/upload',
                                            //     filename: itemData.item,
                                            //     filetype: 'image/jpeg',
                                            //     formDataName: 'fileData',
                                            //     localUri:
                                            //         FileSystem.cacheDirectory +
                                            //         'ImageManipulator/' +
                                            //         itemData.item,
                                            //     token: Constants?.manifest
                                            //         ?.extra?.token,
                                            //     expectedStatusCode: 201,
                                            // });

                                            AlertUpload(
                                                'Uploaded',
                                                'your image has been successfully uploaded !!!!'
                                            );
                                        } catch (err) {
                                            AlertUpload(
                                                'Error',
                                                'Your upload has failed !!!!'
                                            );
                                        }
                                    }}
                                />
                            </>
                        );
                    }}
                />
            ) : null}
        </>
    );
};

const styles = StyleSheet.create({
    image: {
        resizeMode: 'cover',
        height: 100,
        marginTop: 16,
        marginBottom: 16,
    },
});

export default ImagesScreen;
