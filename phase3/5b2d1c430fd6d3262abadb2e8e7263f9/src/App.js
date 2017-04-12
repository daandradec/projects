import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Grid, Segment, Form, Button } from 'semantic-ui-react'


import './App.css';


class App extends Component {
  static defaultProps = {
      center: {lat: 40.42, lng: -86.90},
      zoom: 13,
      apiKey: {
        key: "AIzaSyCuiWcVdaZxnJZbXqzw7r7PAy4Ht6Q5TW4"
      }
    };

  render() {
    return (
      <div className="App">
        <div className="ui_container">
          <Grid>
            <Grid.Column floated='left' width={5} key={2}>
              <Segment compact color="red" textAlign="left">
                Place holder for the UI - would contain the search.
                <Form>
                  <Form.Field>
                    <input placeholder='Fruits/Veggies?' />
                  </Form.Field>
                  <Button type='submit'>Search</Button>
                </Form>
              </Segment>

              <Segment compact color="blue" textAlign="left">
                Place holder for the results - would contain info regarding selected veggies/fruits.
              </Segment>
            </Grid.Column>
          </Grid>

        </div>
        <div className="map_container">
          <GoogleMapReact
            bootstrapURLKeys={this.props.apiKey}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}>
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default App;
