import {
  FETCH_MARKETS
} from '../actions/types';

const INITIAL_STATE = {markets: null}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_MARKETS:
      console.log('ALLMARKETS:', action);
      return  {...state, markets:action.payload.data.results};
    default:
      return [...state];
  }

  return state;
}
