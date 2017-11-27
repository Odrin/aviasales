import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as classnames from 'classnames';
import Pagination from './Pagination';
import TotalRow from './TotalRow';

const columns = [
  {
    key: 'time',
    title: 'Date',
    sorter: (a, b) => a.timestamp - b.timestamp,
    avg: false,
  },
  {
    key: 'searches',
    title: 'Searches',
    avg: false,
  },
  {
    key: 'clicks',
    title: 'Clicks',
    avg: false,
  },
  {
    key: 'unique_clicks',
    title: 'Unq. Clicks',
    avg: false,
  },
  {
    key: 'ctr',
    title: 'CTR',
    avg: true,
  },
  {
    key: 'bookings',
    title: 'Bookings',
    avg: false,
  },
  {
    key: 'sales',
    title: 'Sales',
    avg: false,
  },
  {
    key: 'btr',
    title: 'BTR',
    avg: true,
  },
  {
    key: 'str',
    title: 'STR',
    avg: true,
  },
  {
    key: 'success',
    title: 'Success %',
    avg: true,
  },
  {
    key: 'errors',
    title: 'Errors %',
    avg: true,
  },
  {
    key: 'zeros',
    title: 'Zeros %',
    avg: true,
  },
  {
    key: 'timeouts',
    title: 'T/O %',
    avg: true,
  },
  {
    key: 'duration',
    title: 'Avg Resp',
    avg: true,
  },
];
const totalColumns = columns.filter(column => column.key !== 'time');

function getDefaultSorter(key) {
  return (a, b) => a[key] - b[key];
}

class Table extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
  };

  state = {
    perpage: 10,
    page: 1,
    sortOrder: -1,
    sortColumn: 'time'
  };

  onPageChanged = page => this.setState({ page });

  onHeaderCellClick = (sortColumn) => {
    const sortOrder = sortColumn === this.state.sortColumn ? this.state.sortOrder * -1 : -1;

    this.setState({ sortColumn, sortOrder });
  };

  onPerpageChange = (e) => {
    const perpage = parseInt(e.target.value, 10);

    if (!perpage) {
      return;
    }

    const pageCount = Math.ceil(this.props.data.length / perpage);

    if (pageCount < this.state.page) {
      this.setState({
        page: pageCount,
      });
    }

    this.setState({ perpage });
  };

  onGotoChange = (e) => {
    const page = parseInt(e.target.value, 10);
    const pageCount = Math.ceil(this.props.data.length / this.state.perpage);

    if (!page || page < 0 || page > pageCount) {
      return;
    }

    this.setState({ page });
  };

  getSortedData() {
    const { data } = this.props;
    const { sortColumn, sortOrder } = this.state;
    const sorter = columns.find(column => column.key === sortColumn).sorter || getDefaultSorter(sortColumn);
    const sortedData = data.slice(0);

    sortedData.sort((a, b) => (sorter(a, b)) * sortOrder);

    return sortedData;
  }

  renderHead() {
    const { sortColumn, sortOrder } = this.state;
    const cells = columns.map((column) => {
      const active = sortColumn === column.key;
      const orderClass = active ? `sort-${sortOrder === 1 ? 'asc' : 'desc'}` : null;
      const className = classnames('table-header-cell', orderClass, { active });

      return (
        <th
          key={column.key}
          className={className}
          onClick={() => this.onHeaderCellClick(column.key)}
        >
          {column.title}
        </th>
      );
    });

    return (<thead><tr>{cells}</tr></thead>);
  }

  renderRow(row, index) {
    const even = index % 2 === 0;
    const cells = columns.map((column) => {
      return (
        <td key={column.key}>{row[column.key]}</td>
      );
    });

    return (
      <tr key={row.time} className={even ? 'even' : 'odd'}>{cells}</tr>
    );
  }

  render() {
    const { data } = this.props;
    const { perpage, page } = this.state;
    const sortedData = this.getSortedData();
    const pageCount = Math.ceil(data.length / perpage);
    const start = (page - 1) * perpage;
    const end = start + perpage;
    const totalLabel = `Showing ${start + 1} to ${end + 1} of ${data.length} entries`;
    const pageData = sortedData.slice(start, end);
    const rows = pageData.map(this.renderRow);

    return (
      <div className="table-container">
        <div className="table-perpage">
          <span>Show</span>
          <input type="number" min="1" value={perpage} onChange={this.onPerpageChange} />
          <span>entries</span>
        </div>

        <table className="table">
          {this.renderHead()}

          <tbody>
            {rows}
            <TotalRow label="total on page" columns={totalColumns} data={pageData} />
            <TotalRow label="total" columns={totalColumns} data={data} />
          </tbody>
        </table>

        <div className="table-controls">
          <div className="total-count-label">{totalLabel}</div>
          <div className="goto-page">
            <span>Goto page#:</span>
            <input
              type="number"
              min="1"
              max={pageCount}
              onChange={this.onGotoChange}
            />
          </div>
          <Pagination
            page={page}
            pageCount={pageCount}
            onPageChanged={this.onPageChanged}
          />
        </div>
      </div>
    );
  }
}

export default Table;
