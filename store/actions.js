import * as FS from 'expo-file-system';
import { insertLocation, fetchLocationsDB } from '../config/db';

export const ADD_LOCATION = "ADD_LOCATION";
export const SET_LOCATIONS = "SET_LOCATIONS";

export const addLocation = (title, image, location) => async dispatch => {

    const geoRes = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=AIzaSyAJlLCb3k1PYv-ap3E8cmFtw5NavqPSQSk`);
    const geoData = await geoRes.json()
    const address = geoData.results[0].formatted_address;

    const fileName = image.split('/').pop();
    const newPath = FS.documentDirectory + fileName;

    try {
        await FS.moveAsync({
            from: image,
            to: newPath
        });
        const res = await insertLocation(title, newPath, address, location.latitude, location.longitude)

        dispatch({
            type: ADD_LOCATION,
            payload: { 
                id: res.insertId,
                title,
                image: newPath,
                address: address,
                coords:{
                    lat: location.latitude,
                    lng: location.longitude
                }
            }
        })
    } catch (err) {
        console.log(err)
        throw err
    }
}

export const fetchLocations = () => async dispatch => {

    try {
        const res = await fetchLocationsDB();
        const locations = res.rows._array
        
        dispatch({
            type: SET_LOCATIONS,
            payload: locations
        })
    } catch (err) {
        console.log(err)
        throw err
    }
}