import axios from 'axios';
import moment from 'moment';
import parallel from 'async/parallel';
import {
  FETCH_WEATHER,
  FETCH_MARKETS,
  FETCH_MARKET_DETAILS
} from './types';

const NOAA_TOKEN = 'gUlVPwtLWvHlGnNaiakefaUZyXRQlOqD';

export function fetchWeather(dates) {
  const reqDateEnd = moment(dates).format('YYYY-MM-DD');
  const reqDateStart = moment(dates).subtract(1, 'days').format('YYYY-MM-DD')
  const request = axios.request({
    url: 'https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&locationid=ZIP:47906&units=standard&startdate='+reqDateStart+'&enddate='+reqDateEnd+'&limit=100',
    headers: {'Content-Type': 'application/json', 'token': 'gUlVPwtLWvHlGnNaiakefaUZyXRQlOqD'}
  });

  return {
    type: FETCH_WEATHER,
    payload: request
  };
}

export function fetchMarkets(zipCode) {
  console.log('ZIP:', zipCode);
  const request = axios.request({
    url: 'https://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=' + zipCode
  });

  request.then(function(response){
    var list = [];
    var mlist = response.data.results;
    mlist.map(function(mkt){
      list.push(function(callback){
        axios.request({
          url: 'https://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=' + mkt.id
        }).then(function(response){
          var nObj = {};
          nObj['name'] = mkt.marketname;
          nObj['details'] = response.data.marketdetails;
          var googleLink = response.data.marketdetails.GoogleLink;
          nObj['coords'] = decodeURIComponent(googleLink.substring(googleLink.indexOf("=")+1, googleLink.lastIndexOf("("))).split(',');
          callback(null, nObj);
        });
      });
    });

    parallel(list, function(err, results) {
      return {
        type: FETCH_MARKETS,
        payload: results
      };
    })
  });


}

export function fetchMarketDetails(markedId) {
  const request = axios.request({
    url: 'https://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=' + markedId
  });

  return {
    type: FETCH_MARKET_DETAILS,
    payload: request
  };
}
