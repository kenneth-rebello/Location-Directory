import React, { useEffect } from 'react'
import { Platform, FlatList } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../components/HeaderButton'
import { useSelector, useDispatch } from 'react-redux'
import LocationItem from '../components/LocationItem'
import { fetchLocations } from '../store/actions'

const LocationListScreen = ({navigation}) => {

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchLocations());
    },[])
    
    const locations = useSelector(state => state.location.locations)

    return (
        <FlatList 
            data={locations}
            keyExtractor={item => item.id}
            renderItem={itemData => <LocationItem 
                onSelect={()=>navigation.navigate('LocationDetail',{
                    locationTitle: itemData.item.title,
                    locationId: itemData.item.id
                })}
                image={itemData.item.imageURI}
                address={itemData.item.address}
                title={itemData.item.title}    
            />}
        />
    )
}

LocationListScreen.navigationOptions = navData => {
    return {
        headerTitle:'All Locations',
        headerRight:() => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item 
                title="Add Loacation"
                iconName={Platform.OS==='android'?'md-add':'ios-add'}
                onPress={()=>{
                    navData.navigation.navigate('NewLocation')
                }}

            />
        </HeaderButtons>
    }
}

export default LocationListScreen