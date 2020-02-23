import LocationListScreen from "../screens/LocationListScreen";
import LocationDetailScreen from "../screens/LocationDetailScreen";
import NewLocationScreen from "../screens/NewLocationScreen";
import MapScreen from "../screens/MapScreen";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import Colors from "../utils/Colors";
import { createAppContainer } from "react-navigation";

const LocationNavigator = createStackNavigator({
    Locations: {
        screen: LocationListScreen
    },
    LocationDetail: {
        screen: LocationDetailScreen,
        navigationOptions:{}
    },
    NewLocation: {
        screen: NewLocationScreen
    },
    Map: {
        screen: MapScreen
    }
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS==='android' ? Colors.primary : null
        },
        headerTintColor: Platform.OS==='android' ? 'whitesmoke' : Colors.primary
    }
})

export default createAppContainer(LocationNavigator);