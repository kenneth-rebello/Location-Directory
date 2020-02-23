import React from 'react'
import { StyleSheet, Image, TouchableOpacity } from 'react-native'

const MapPreview = (props) => {

    let mapURL = ''

    if(props.location){
        mapURL = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=17&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.location.lat},${props.location.lng}&key=AIzaSyAJlLCb3k1PYv-ap3E8cmFtw5NavqPSQSk`
    }

    return (
        <TouchableOpacity style={styles.preview} onPress={props.onPress}>
            {props.location ? <Image 
                style={{...styles.image, ...props.style}}
                source={{uri: mapURL}}
            /> : props.children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    preview:{
        marginVertical:30,
        width:'100%',
        height:150,
        borderWidth:1,
        borderColor:'#ccc',
        justifyContent:'center',
        alignItems:'center'
    },
    image:{
        height:200,
        width:400,
        margin:10
    }
})

export default MapPreview