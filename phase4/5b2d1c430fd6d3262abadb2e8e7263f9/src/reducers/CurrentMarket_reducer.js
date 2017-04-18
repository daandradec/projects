import {
  FETCH_MARKET_DETAILS
} from '../actions/types';

const INITIAL_STATE = {currentMarketDetail: null}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_MARKET_DETAILS:
      console.log('CURRENTMARKET:', action.payload.data);
      return  {...state, currentMarketDetail:action.payload.data.marketdetails};
    default:
      return [...state];
  }

  return state;
}
