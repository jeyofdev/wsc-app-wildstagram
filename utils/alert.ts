import { Alert } from 'react-native';

const AlertUpload = (title: string, message: string) => {
    Alert.alert(title, message, [
        {
            text: 'OK',
        },
    ]);
};

export default AlertUpload;
