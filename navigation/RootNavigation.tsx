import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import CameraScreen from '../screens/CameraScreen';
import FeedScreen from '../screens/FeedScreen';
import ImagesScreen from '../screens/ImagesScreen';

const Tab = createBottomTabNavigator();

const RootNavigation = () => {
    const getIcon = (
        route: RouteProp<ParamListBase, string>,
        focused: boolean
    ) => {
        switch (route.name) {
            case 'Camera':
                return focused ? 'camera' : 'camera-outline';
                break;
            case 'Images':
                return focused ? 'image' : 'image-outline';
                break;
            case 'Feed':
                return focused ? 'share-social' : 'share-social-outline';
                break;

            default:
                break;
        }
    };

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    return (
                        <Ionicons
                            name={getIcon(route, focused)}
                            size={size}
                            color={color}
                        />
                    );
                },
                tabBarActiveTintColor: '#818cf8',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen
                name="Camera"
                options={{ unmountOnBlur: true }}
                component={CameraScreen}
            />
            <Tab.Screen name="Images" component={ImagesScreen} />
            <Tab.Screen name="Feed" component={FeedScreen} />
        </Tab.Navigator>
    );
};

export default RootNavigation;
