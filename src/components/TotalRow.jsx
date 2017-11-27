import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class TotalRow extends PureComponent {
  static propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    label: PropTypes.string.isRequired,
  };

  getTotal() {
    const { data, columns } = this.props;

    const total = data.reduce((prev, item) => {
      for (let i = 0; i < columns.length; i++) {
        const column = columns[i];
        const key = column.key;
        const value = item[key];

        if (typeof (prev[key]) === 'undefined') {
          prev[key] = 0;
        }

        prev[key] += column.avg ? value / data.length : value;
      }

      return prev;
    }, {});

    return total;
  }

  render() {
    const { columns, label } = this.props;
    const total = this.getTotal();
    const cells = columns.map((column) => {
      const value = column.avg ? Math.round(total[column.key] * 100) / 100 : total[column.key];

      return (<td key={column.key}>{value || ''}</td>);
    });

    return (
      <tr className="total-row">
        <td className="total-label">{label}</td>
        {cells}
      </tr>
    );
  }
}

export default TotalRow;
