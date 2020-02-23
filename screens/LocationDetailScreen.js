import React from 'react'
import { View, StyleSheet, ScrollView, Image, Text } from 'react-native'
import MapPreview from '../components/MapPreview'
import { useSelector } from 'react-redux';
import Colors from '../utils/Colors';

const LocationDetailScreen = (props) => {

    const placeId = props.navigation.getParam('locationId');
    const location = useSelector(state => state.location.locations.find(loc => loc.id === placeId))
    const coords = {
        latitude: location.lat,
        longitude: location.lng
    }

    return (
        <ScrollView>
            <Image source={{uri: location.imageURI}} style={styles.image}/>
            <View style={styles.container}>
                <View style={styles.addressContainer}>
                    <Text style={styles.address}>{location.address}</Text>
                </View>
                <MapPreview style={styles.preview} 
                    location={{lat:location.lat, lng:location.lng}}
                    onPress={()=>{props.navigation.navigate('Map', {readOnly: true, initialLocation:coords})}}
                />
            </View>
        </ScrollView>
    )
}

LocationDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('locationTitle')
    }
}

const styles = StyleSheet.create({
    image:{
        height:'35%',
        minHeight:300,
        width:'100%',
        backgroundColor:'#ccc'
    },
    container:{
        marginVertical: 20,
        marginHorizontal:5,
        width: '100%',
        maxWidth: 350,
        justifyContent: 'center',
        alignItems:'center',
        shadowColor:'black',
        shadowOpacity:0.26,
        shadowOffset:{ width:0, height:2},
        shadowRadius: 8,
        elevation:5,
        backgroundColor:'white',
        borderRadius:10
    },
    addressContainer:{
        padding: 20
    },
    address:{
        color: Colors.primary,
        textAlign:'center'
    },
    preview:{
        width:'100%'
    }
})

export default LocationDetailScreen