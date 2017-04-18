import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import {connect} from 'react-redux';
import SearchUI from './components/SearchUI';
import MarketDetails from './components/market_details'

import * as actions from './actions';

import './App.css';


class App extends Component {
  componentDidMount() {
    this.props.fetchMarkets('47906');
  }

  static defaultProps = {
      center: {lat: 40.42, lng: -86.90},
      zoom: 13,
      apiKey: {
        key: "AIzaSyCuiWcVdaZxnJZbXqzw7r7PAy4Ht6Q5TW4"
      }
    };

  _onBoundsChange = (center, zoom /* , bounds, marginBounds */) => {
    console.log('bounds changed', center, zoom);
  }

  placeMarketPoints(points) {
    console.log('MP:', points.markets);
    if(points.markets && points.markets.length > 0) {
      console.log('points.markets');
    }
  }

  render() {
    return (
      <div className="App">
      <SearchUI />
        <div className="map_container">
          <GoogleMapReact
            bootstrapURLKeys={this.props.apiKey}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
            onBoundsChange={this._onBoundsChange}
            >
          {this.placeMarketPoints(this.props.markets)}
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {markets: state.markets};
}

export default connect(mapStateToProps, actions)(App);
