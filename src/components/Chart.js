import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Chart extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
  };

  static defaultProps = {};

  state = {};

  render() {

    return (
      <div className="chart">

      </div>
    );
  }
}

export default Chart;
