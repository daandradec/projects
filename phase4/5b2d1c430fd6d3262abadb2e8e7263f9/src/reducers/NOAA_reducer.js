import {
  FETCH_WEATHER
} from '../actions/types';

const INITIAL_STATE = {weather: null}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_WEATHER:
      return  {...state, weather:action.payload.data.results};
    default:
      return [...state];
  }

  return state;
}
