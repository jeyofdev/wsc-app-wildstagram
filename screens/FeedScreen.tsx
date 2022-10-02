import { useEffect, useState } from 'react';
import axios from 'axios';
import { FlatList, Image, StyleSheet, Text } from 'react-native';

const FeedScreen = () => {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        (async () => {
            const photosURI = await axios.get(
                'https://wildstagram.nausicaa.wilders.dev/list'
            );

            setPhotos(photosURI.data);
        })();
    }, []);

    return (
        <>
            {photos.length > 0 ? (
                <FlatList
                    data={photos}
                    keyExtractor={(photoData) => photoData}
                    renderItem={(photoData) => {
                        return (
                            <>
                                <Image
                                    style={styles.image}
                                    source={{
                                        uri: `https://wildstagram.nausicaa.wilders.dev/files/${photoData.item}`,
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
        resizeMode: 'contain',
        height: 300,
    },
});

export default FeedScreen;
