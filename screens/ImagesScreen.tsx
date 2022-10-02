import { useEffect, useState } from 'react';
import * as FileSystem from 'expo-file-system';
import { FlatList, Image, StyleSheet, Text } from 'react-native';

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
        marginBottom: 16,
    },
});

export default ImagesScreen;
