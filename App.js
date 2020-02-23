import React from 'react';
import LocationNavigator from './navigation/AppNavigator';
import locationReducer from './store/reducer';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { init } from './config/db';

export default function App() {

  init().then(()=>{
    console.log('Initialized DB')
  }).catch(err=>{
    console.log('Initializing DB failed')
    console.log(err)
  })
  
  const rootReducer = combineReducers({
    location: locationReducer
  })

  const store = createStore(rootReducer, applyMiddleware(thunk))
  
  return (
    <Provider store={store}>
      <LocationNavigator />
    </Provider>
  );
}