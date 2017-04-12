import axios from 'axios';
import {
  FETCH_WEATHER
} from './types';

const NOAA_TOKEN = 'gUlVPwtLWvHlGnNaiakefaUZyXRQlOqD';

export function fetchWeather() {
  const request = axios.request({
    url: 'https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GSOM&stationid=GHCND:USC00010008&units=standard&startdate=2010-05-01&enddate=2010-05-31',
    method: 'get'
  });

  return {
    type: FETCH_USERS,
    payload: request
  };
}
