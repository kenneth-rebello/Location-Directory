import React, { useState } from 'react'
import { View, Button, StyleSheet, Image, Text, Alert } from 'react-native'
import Colors from '../utils/Colors'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'

const ImageCapture = (props) => {
    const [clickedImage, setClickedImage] = useState(null)

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA)
        if(result.status !== 'granted'){
            Alert.alert('Insufficient permissions','You need to grant access to camera to use this feature')
            return false
        }
        return true
    }

    const takeImageHandler = async () => {
        const permitted = await verifyPermissions();
        if(!permitted){
            return
        }
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect:[16, 9],
            quality: 0.5
        });

        setClickedImage(image.uri)
        props.onImageTaken(image.uri)
    }

    return (
        <View style={styles.screen}>
            <View style={styles.content}>
                {!clickedImage ? <Text style={styles.msg}>No image picked yet</Text> :
                <Image style={styles.image} source={{uri: clickedImage}} />}
            </View>
            <View style={styles.btn}>
                <Button title="Capture" color={Colors.primary} onPress={takeImageHandler} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        alignItems:'center'
    },
    content:{
        width:'100%',
        height:200,
        marginBottom: 10,
        justifyContent:'center',
        alignItems:'center',
        borderColor: '#ccc',
        borderWidth:1
    },
    msg:{
        color:Colors.primary
    },
    image:{
        height:'100%',
        width:'100%'
    },
    btn:{
        paddingVertical:10
    }
})

export default ImageCapture