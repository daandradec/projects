import React, { Component } from 'react';
import { Grid, Segment, Form, Button, Label } from 'semantic-ui-react'
import {connect} from 'react-redux';
import moment from 'moment';

import * as actions from '../actions';

class CurrentWeather extends Component {
  componentDidMount() {
  }

  renderWeather(weatherSet) {
    if (weatherSet.weather && weatherSet.weather.length > 0) {
      console.log('Weather:', weatherSet.weather);
      let tobs, snow, prcp;
      for(let iter = 0; iter < weatherSet.weather.length; iter++) {
        if(weatherSet.weather[iter].station == "GHCND:US1INTP0009" && weatherSet.weather[iter].datatype == "PRCP") {
          if(weatherSet.weather[iter].value > 2) {
            prcp = (<Label color={'teal'}>Rainy</Label>);
          }
          else {
            prcp = (<Label color={'teal'}>No Rain</Label>);
          }

        }
        else if(weatherSet.weather[iter].station == "GHCND:US1INTP0009" && weatherSet.weather[iter].datatype == "SNOW") {
          if(weatherSet.weather[iter].value > 2) {
            snow = (<Label color={'grey'}>Snowing</Label>);
          }
          else {
            snow = (<Label color={'grey'}>No Snow</Label>);
          }

        }
        else if(weatherSet.weather[iter].station == "GHCND:USC00129430" && weatherSet.weather[iter].datatype == "TOBS") {
          if(weatherSet.weather[iter].value >= 65) {
              tobs = (<Label color={'orange'}>{weatherSet.weather[iter].value}°</Label>);
          }
          else if(weatherSet.weather[iter].value < 65 && weatherSet.weather[iter].value > 40) {
              tobs = (<Label color={'green'}>{weatherSet.weather[iter].value}°</Label>);
          }
          else {
            tobs = (<Label color={'blue'}>{weatherSet.weather[iter].value}°</Label>);
          }
        }
      }
      console.log(tobs, snow, prcp);
      return (<Segment compact color="blue" textAlign="left">{prcp} {snow} {tobs}</Segment>);
    }
    /*else {
      return (<Segment compact color="blue" textAlign="left" loading></Segment>);
    }*/
  }

  render() {
    return (
      <div>{this.renderWeather(this.props.weather)}</div>
    );
  }
}

function mapStateToProps(state) {
  return {weather: state.weather};
}

export default connect(mapStateToProps, actions)(CurrentWeather);
