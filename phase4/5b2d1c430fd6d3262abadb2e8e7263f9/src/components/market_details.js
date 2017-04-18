import React, { Component } from 'react';
import { Grid, Segment, Form, Button, Label } from 'semantic-ui-react'
import {connect} from 'react-redux';
import moment from 'moment';

import * as actions from '../actions';

class MarketDetails extends Component {
  componentDidMount() {
    this.state = {
      clicked: false
    }
  }


  render() {
    return (
      <div><Label as="a" color="red" tag>{this.props.marketname}</Label></div>
    );
  }
}

function mapStateToProps(state) {
  return {currentMarketDetail: state.currentMarketDetail};
}

export default connect(mapStateToProps, actions)(MarketDetails);
