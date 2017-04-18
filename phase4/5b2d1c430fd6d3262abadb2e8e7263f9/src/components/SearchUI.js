import React, { Component } from 'react';
import { Grid, Segment, Form, Button } from 'semantic-ui-react'
import {connect} from 'react-redux';
import { DatePicker, DatePickerInput } from 'rc-datepicker';
import moment from 'moment';

import CurrentWeather from './WeatherResults';

import * as actions from '../actions';

import 'react-datepicker/dist/react-datepicker.css';
import 'rc-datepicker/lib/style.css';

class SearchUI extends Component {
  constructor (props) {
    super(props);
    this.state = {
      startDate: moment().subtract(1, 'days')
    };
    this.handleChange = this.handleChange.bind(this);
    this.getWeather = this.getWeather.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date,
      queryComplete: false
    });
  }

  getWeather() {
    this.props.fetchWeather(this.state.startDate);
  }

  render(){
    return (
      <div className="ui_container">
        <Grid>
          <Grid.Column floated='left' width={5} key={2}>
            <Segment compact color="red" textAlign="left">
              Pick a date:
              <Form>
                <Form.Field>

                  <DatePickerInput
                    onChange={this.handleChange}
                    value={this.state.startDate}
                  />
                </Form.Field>
                <Button type='button' onClick={this.getWeather}>Search</Button>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid>
        <br />
        <CurrentWeather />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {weather: state.weather};
}

export default connect(mapStateToProps, actions)(SearchUI);
