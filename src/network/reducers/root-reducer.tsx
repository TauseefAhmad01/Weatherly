import {persistReducer} from 'redux-persist';
import locationReducer from './location-reducer';
import weatherReducer from './weather-reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const rootReducer = combineReducers({
  weather: weatherReducer,
  location: locationReducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
