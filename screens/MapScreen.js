import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Colors from '../utils/Colors';

const MapScreen = (props) => {
    const initialLocation = props.navigation.getParam('initialLocation')
    const readOnly = props.navigation.getParam('readOnly')

    const [region, setRegion] = useState(null)
    const [loading, setLoading] = useState(true)
    const [location, setLocation] = useState(initialLocation)

    let markerCoords;

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION)
        if(result.status !== 'granted'){
            Alert.alert('Insufficient permissions','You need to grant access to camera to use this feature')
            return false
        }
        return true
    }

    const getRegion = async () => {
        const permitted = await verifyPermissions()
        if(!permitted){
            return;
        }
        try {
            const currentLocation = await Location.getCurrentPositionAsync()    
            setRegion({
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            })
            setLoading(false)
        } catch (err) {
            console.log(err)
            Alert.alert('Could not fetch location', 'Please try again or pick a location on the map')
        }
    }
    
    useEffect(()=>{
        getRegion()
    },[])

    if(location){
        markerCoords = location
    }

    const onMapTap = event => {
        if(readOnly){
            return
        }
        setRegion({
            ...region,
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude
        })
        setLocation({
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude,
        })
    }

    const saveLocation = useCallback(() => {
        if(!location){
            Alert.alert('Invalid','Please select a location by tapping on the map')
            return
        }
        props.navigation.navigate('NewLocation', {pickedLocation: location});
    },[location])

    useEffect(()=>{
        props.navigation.setParams({save: saveLocation})
    }, [saveLocation])

    return (
        loading ? <View style={styles.screen}>
            <Text>Map Not Loaded</Text> 
        </View>
            :
        <MapView region={region} style={styles.map} onPress={onMapTap}>
            {location && <Marker title="Your location" coordinate={markerCoords}></Marker>}
        </MapView>
    )
}

MapScreen.navigationOptions = navData => {
    const saveFunc = navData.navigation.getParam('save');
    const readOnly = navData.navigation.getParam('readOnly');
    return {
        headerTitle: 'Pick Location',
        headerRight: () => readOnly ? null : <TouchableOpacity style={styles.headerBtnContainer} onPress={saveFunc}>
            <Text style={styles.headerBtn}>Save</Text>
        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    map:{
        flex:1
    },
    headerBtnContainer:{
        marginHorizontal:20
    },
    headerBtn:{
        fontSize:18,
        color: Platform.OS==='android' ? 'ghostwhite' : Colors.primary
    }
})

export default MapScreen