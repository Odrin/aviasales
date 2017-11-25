import React, { Component } from 'react';
import axios from 'axios';
import Chart from './Chart';

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

      console.log(response);

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

    return (
      <div className="app">
        <Chart data={data} />
      </div>
    );
  }
}

export default App;
