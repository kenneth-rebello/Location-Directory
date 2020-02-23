import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, TextInput, Button, Text, Alert } from 'react-native'
import Colors from '../utils/Colors'
import { useDispatch } from 'react-redux'
import { addLocation } from '../store/actions'
import ImageCapture from '../components/ImageCapture'
import LocationCapture from '../components/LocationCapture'

const NewLocationScreen = ({navigation}) => {

    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [clickedImage, setClickedImage] = useState(null)
    const [detectedLocation, setDetectedLocation] = useState(null)

    const titleChanger = text => {
        setTitle(text)
    }

    const saveLocation = () => {
        if(title==='' || clickedImage===null || detectedLocation===null){
            Alert.alert('Invalid','Please fill all fields')
            return
        }
        dispatch(addLocation(title, clickedImage, detectedLocation))
        navigation.goBack()
    }

    const imageHandler = imageURI => {
        setClickedImage(imageURI)
    }
    const locationHandler = location => {
        setDetectedLocation({
            latitude: location.lat,
            longitude: location.lng
        })
    }

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.input} onChangeText={titleChanger}/>
                <ImageCapture onImageTaken={imageHandler} />
                <LocationCapture onLocationDetected={locationHandler} navigation={navigation} />
                <Button title="Save" color={Colors.primary} onPress={saveLocation}/>
            </View>
        </ScrollView>
    )
}

NewLocationScreen.navigationOptions = {
    headerTitle:'Add A New Location'
}

const styles = StyleSheet.create({  
    form:{
        margin:30
    },
    label:{
        fontSize: 18,
        marginBottom: 15
    },
    input:{
        borderBottomColor:'#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal:2
    }
})

export default NewLocationScreen