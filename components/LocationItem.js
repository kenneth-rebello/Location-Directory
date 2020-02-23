import React from 'react'
import { TouchableOpacity, Image, View, StyleSheet, Text } from 'react-native'
import Colors from '../utils/Colors'

const LocationItem = (props) => {
    return (
        <TouchableOpacity onPress={props.onSelect} style={styles.item}>
            <Image style={styles.image} source={{uri: props.image}}/>
            <View style={styles.container}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.address}>{props.address}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item:{
        borderBottomColor:'#ccc',
        borderBottomWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    image:{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'ghostwhite',
        borderColor: Colors.primary,
        borderWidth:1
    },
    container:{
        marginLeft: 25,
        width: 250,
        justifyContent:'center',
        alignItems:'flex-start'
    },
    title:{
        color:'black',
        fontSize:18,
        marginBottom: 5
    },
    address:{
        color:'#666',
        fontSize: 16
    }
})

export default LocationItem