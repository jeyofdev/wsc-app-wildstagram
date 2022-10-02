import { useEffect, useState } from 'react';
import * as FileSystem from 'expo-file-system';
import singleFileUploader from 'single-file-uploader';
import Constants from 'expo-constants';
import { Button, FlatList, Image, StyleSheet, Text } from 'react-native';

const ImagesScreen = () => {
    const [imagesList, setImagesList] = useState<string[]>([]);

    useEffect(() => {
        (async () => {
            const images = await FileSystem.readDirectoryAsync(
                (FileSystem.cacheDirectory as string) + 'ImageManipulator'
            );

            console.log('images', images);
            setImagesList(images);
        })();
    }, []);

    return (
        <>
            <Text>ImagesScreen</Text>

            {imagesList.length > 0 ? (
                <FlatList
                    data={imagesList}
                    keyExtractor={(imageData) => imageData}
                    renderItem={(itemData) => {
                        console.log('imageeeeeeee', itemData);

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
                                            await singleFileUploader({
                                                distantUrl:
                                                    'https://wildstagram.nausicaa.wilders.dev/upload',
                                                filename: itemData.item,
                                                filetype: 'image/jpeg',
                                                formDataName: 'fileData',
                                                localUri:
                                                    FileSystem.cacheDirectory +
                                                    'ImageManipulator/' +
                                                    itemData.item,
                                                token: Constants?.manifest
                                                    ?.extra?.token,
                                                expectedStatusCode: '201',
                                            });

                                            alert('Uploaded');
                                        } catch (err) {
                                            alert('Error');
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
