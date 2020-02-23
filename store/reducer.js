import { ADD_LOCATION, SET_LOCATIONS } from "./actions"
import Location from "../models/location"

const initalState = {
    locations: []
}

export default (state=initalState,action) => {
    switch(action.type){
        case ADD_LOCATION:
            const newLoc = new Location(
                action.payload.id.toString(), 
                action.payload.title,
                action.payload.image,
                action.payload.address,
                action.payload.coords.lat,
                action.payload.coords.lng    
            )
            return {
                locations:[...state.locations, newLoc]
            }
        case SET_LOCATIONS:
            return{
                locations: action.payload.map(loc => new Location(loc.id.toString(), loc.title, loc.imageURI, loc.address, loc.lat, loc.lng))
            }
        default:
            return state
    }
}