import React, { Component } from 'react';
import axios from 'axios';
import Chart from './Chart';
import Table from './Table';
import moment from 'moment';

class App extends Component {

  state = {
    loading: false,
    data: [],
  };

  componentDidMount() {
    this.getData();
  }

  async getData() {
    const url = 'http://backoffice.aviasales.ru/api/statistics';
    const jwt = 'Bearer eyJpYXQiOjE1MDkzNDEzNzgsImFsZyI6IkhTMjU2IiwiZXhwIjoxNTQwNDQ1Mzc4fQ.eyJpZCI6MTI2NiwicGVybWlzc2lvbnMiOlsiQmFzaWMgUmVwb3J0cyJdLCJnYXRlX2lkIjotMTQzLCJleHAiOiIyMDE4LTEwLTI1IDA1OjI5OjM4In0.dD_So803EIkRM86ARm1RxPy85lzNse2hNaPMjndkPpg';
    const config = {
      params: {
        from: '2017-10-27',
        to: '2017-11-02',
        interval: '1h',
      },
      headers: {
        Authorization: jwt,
      },
    };

    this.setState({ loading: true });

    try {
      const response = await axios.get(url, config);

      console.log(response.data.data);

      this.setState({ data: response.data.data });
    }
    catch (error) {

    }
    finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { data, loading } = this.state;

    const parsedData = data.map(item => ({
      ...item,
      timestamp: moment(item.time, 'YYYY-MM-DD HH:mm').valueOf(),
      btr: parseFloat(item.btr),
      ctr: parseFloat(item.ctr),
      errors: parseFloat(item.errors),
      str: parseFloat(item.str),
      success: parseFloat(item.success),
      timeouts: parseFloat(item.timeouts),
      zeros: parseFloat(item.zeros),
    }));

    return (
      <div className="app">
        <Chart data={parsedData} />
        <Table data={parsedData} />
        {
          loading && (<div className="loading-overlay" />)
        }
      </div>
    );
  }
}

export default App;
