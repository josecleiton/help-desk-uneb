import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TableHead from './Head';
import TableRow from './Row';
import TableCaption from './Caption';

import './style.css';

export default class Table extends Component {
  constructor(props) {
    super(props);
    const { head, columnSortKey } = props;
    this.state = {
      tableHead: this.makeTableHead(head, -1, 0),
      tableRows: this.makeTableRows(this.initialSort(columnSortKey)),
    };
    this.activeHeader = Array(head.length).fill(0);
  }

  initialSort = (column) => {
    const { dateFields, rows } = this.props;
    const columnIsDate = dateFields.indexOf(column) !== -1;
    rows.sort((a, b) => {
      if (!columnIsDate) {
        if (a[column] > b[column]) return -1;
        if (a[column] < b[column]) return 1;
      } else {
        const timeStamps = this.makeDateFields(a[column], b[column]);
        if (timeStamps[0] > timeStamps[1]) return -1;
        if (timeStamps[0] < timeStamps[1]) return 1;
      }
      return 0;
    });
    return rows;
  };

  makeDateFields = (a, b) => {
    const toTimeStamp = Array(2);
    const result = Array(2);
    toTimeStamp[0] = a;
    toTimeStamp[1] = b;
    for (let i = 0; i < 2; i += 1) {
      const day = toTimeStamp[i].substr(0, 2);
      const month = toTimeStamp[i].substr(3, 2);
      toTimeStamp[i] = toTimeStamp[i].replace(RegExp(`${day}|${month}`, 'g'), match => (match === day ? month : day));
      result[i] = Date.parse(toTimeStamp[i]);
    }
    return result;
  };

  makeTableHead = (stringHead, toHighlight, clickCounter) => stringHead.map((column, index) => (
    <TableHead
      key={column}
      highlight={index === toHighlight}
      clickCounter={clickCounter}
      onClick={this.handleSort}
      columnPosition={index}
    >
      {column}
    </TableHead>
  ));

  makeTableRows = (stringRows) => {
    const { goToUrl, rowsPrimaryKey, checkInfo } = this.props;
    const htmlCells = stringRows.map(el => (
      <TableRow
        key={el[0]}
        primaryKey={rowsPrimaryKey}
        elements={el}
        url={goToUrl}
        checkInfo={checkInfo}
      />
    ));
    return htmlCells;
  };

  handleSort = (column) => {
    const { rows, head, dateFields } = this.props;
    const columnState = this.activeHeader[column] + 1;
    const columnIsDate = dateFields.indexOf(column) !== -1;
    this.activeHeader.fill(0);
    if (columnState % 3) {
      this.activeHeader[column] = columnState;
      rows.sort((a, b) => {
        if (columnState % 2) {
          if (!columnIsDate) {
            if (a[column] > b[column]) return -1;
            if (a[column] < b[column]) return 1;
          } else {
            const timeStamps = this.makeDateFields(a[column], b[column]);
            if (timeStamps[0] > timeStamps[1]) return -1;
            if (timeStamps[0] < timeStamps[1]) return 1;
          }
        } else if (!columnIsDate) {
          if (a[column] > b[column]) return 1;
          if (a[column] < b[column]) return -1;
        } else {
          const timeStamps = this.makeDateFields(a[column], b[column]);
          if (timeStamps[0] > timeStamps[1]) return 1;
          if (timeStamps[0] < timeStamps[1]) return -1;
        }
        return 0;
      });
      this.setState({
        tableHead: this.makeTableHead(head, column, columnState),
        tableRows: this.makeTableRows(rows),
      });
    } else {
      const { columnSortKey } = this.props;
      this.setState({
        tableHead: this.makeTableHead(head, -1, 0),
        tableRows: this.makeTableRows(this.initialSort(columnSortKey)),
      });
    }
  };

  render() {
    const { title, margin } = this.props;
    const { tableRows, tableHead } = this.state;
    return (
      <div className="admin-table-wrapper">
        <table className="admin" style={{ margin }}>
          <caption style={{ display: title.length ? '' : 'none' }}>
            {title}
            <TableCaption orderingColors={['#d61818', '#347dd6', '#2964ad']} />
          </caption>
          <thead>
            <tr>{tableHead}</tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
      </div>
    );
  }
}

Table.defaultProps = {
  title: '',
  margin: '0 auto',
  goToUrl: '',
  rowsPrimaryKey: 0,
  dateFields: [],
};

Table.propTypes = {
  title: PropTypes.string,
  margin: PropTypes.string,
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  rowsPrimaryKey: PropTypes.number,
  columnSortKey: PropTypes.number.isRequired,
  head: PropTypes.arrayOf(PropTypes.string).isRequired,
  goToUrl: PropTypes.string,
  dateFields: PropTypes.arrayOf(PropTypes.number),
};
