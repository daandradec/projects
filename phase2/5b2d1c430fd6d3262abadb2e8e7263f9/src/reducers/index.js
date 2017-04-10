import { combineReducers } from 'redux';
import wReducer from './NOAA_reducer';

const rootReducer = combineReducers({
  weather: wReducer
});

export default rootReducer;
