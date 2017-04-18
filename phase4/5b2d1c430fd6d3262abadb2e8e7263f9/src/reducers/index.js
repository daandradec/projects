import { combineReducers } from 'redux';
import wReducer from './NOAA_reducer';
import mReducer from './Market_reducer';
import cmReducer from './CurrentMarket_reducer';

const rootReducer = combineReducers({
  weather: wReducer,
  markets: mReducer,
  currentMarketDetail: cmReducer
});

export default rootReducer;
