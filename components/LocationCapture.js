import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Button, Text, Alert, ActivityIndicator } from 'react-native'
import Colors from '../utils/Colors'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapPreview from './MapPreview';

const LocationCapture = (props) => {

    const [pickedLocation, setPickedLocation] = useState(null)
    const [loading, setLoading] = useState(false)

    const pickedLocationManual = props.navigation.getParam('pickedLocation');

    useEffect(()=>{
        if(pickedLocationManual){
            setPickedLocation({
                lat: pickedLocationManual.latitude,
                lng: pickedLocationManual.longitude 
            })
        }
    },[pickedLocationManual])

    useEffect(()=>{
        if(pickedLocation) props.onLocationDetected(pickedLocation)
    },[pickedLocation])

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION)
        if(result.status !== 'granted'){
            Alert.alert('Insufficient permissions','You need to grant access to camera to use this feature')
            return false
        }
        return true
    }

    const locationHandler = async() => {
        const permitted = await verifyPermissions()
        if(!permitted){
            return;
        }
        setLoading(true)
        try {
            const currentLocation = await Location.getCurrentPositionAsync()    
            setPickedLocation({
                lat: currentLocation.coords.latitude,
                lng: currentLocation.coords.longitude
            })
        } catch (err) {
            console.log(err)
            Alert.alert('Could not fetch location', 'Please try again or pick a location on the map')
        }
        setLoading(false)
    }

    const pickHandler = () => {
        setPickedLocation(null)
        props.navigation.navigate('Map')
    }

    return (
        <View style={styles.screen}>
            <MapPreview location={pickedLocation} onPress={pickHandler}>
                {loading ? <ActivityIndicator size="small" color={Colors.primary}/> 
                    : 
                <Text style={styles.msg}>No location detected yet</Text>}
            </MapPreview>
            <View style={styles.btnContainer}>
                <Button title="Get Location" color={Colors.primary} onPress={locationHandler}/>        
                <Button title="Pick Location" color={Colors.primary} onPress={pickHandler} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        marginBottom:15
    },
    msg:{
        color:Colors.primary
    },
    btnContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        width:'100%'
    }
})

export default LocationCapture