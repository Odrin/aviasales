import React from 'react';
import PropTypes from 'prop-types';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

function formatDateTime(value) {
  const [date, time] = value.split(' ');

  if (time === '00:00') {
    return date;
  }

  return time;
}

function Chart(props) {
  const { data } = props;

  return (
    <div className="chart">
      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          data={data}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
          <XAxis dataKey="time" interval="preserveStartEnd" minTickGap={20} tickFormatter={formatDateTime} />
          <YAxis yAxisId="left" type="number" />
          <YAxis yAxisId="right" orientation="right" type="number" />
          <CartesianGrid />
          <Tooltip/>
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="searches" stroke="#C0392B" name="Searches" />
          <Line yAxisId="left" type="monotone" dataKey="bookings" stroke="#E74C3C" name="Bookings" />
          <Line yAxisId="left" type="monotone" dataKey="clicks" stroke="#9B59B6" name="Clicks" />
          <Line yAxisId="left" type="monotone" dataKey="sales" stroke="#8E44AD" name="Sales" />
          <Line yAxisId="left" type="monotone" dataKey="unique_clicks" stroke="#2980B9" name="Unq. Clicks" />
          <Line yAxisId="left" type="monotone" dataKey="duration" stroke="#3498DB" name="Avg Resp" />

          <Line yAxisId="right" type="monotone" dataKey="btr" stroke="#1ABC9C" name="BTR" />
          <Line yAxisId="right" type="monotone" dataKey="ctr" stroke="#16A085" name="CTR" />
          <Line yAxisId="right" type="monotone" dataKey="str" stroke="#2ECC71" name="STR" />
          <Line yAxisId="right" type="monotone" dataKey="errors" stroke="#27AE60" name="Errors %" />
          <Line yAxisId="right" type="monotone" dataKey="success" stroke="#F39C12" name="Success %" />
          <Line yAxisId="right" type="monotone" dataKey="timeouts" stroke="#E67E22" name="T/O %" />
          <Line yAxisId="right" type="monotone" dataKey="zeros" stroke="#D35400" name="Zeros %" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

Chart.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Chart;
