import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TableHead from './Head';
import TableRow from './Row';
import TableCaption from './Caption';

import './style.css';

export default class AdminTable extends Component {
  constructor(props) {
    super(props);
    const { rows, head } = props;
    this.state = {
      tableHead: this.makeTableHead(head, -1, 0),
      tableRows: this.makeTableRows(rows),
    };
    this.activeHeader = Array(head.length).fill(0);
    this.defaultRows = [...rows];
  }

  handleSort = (column) => {
    const { rows, head } = this.props;
    const columnState = this.activeHeader[column] + 1;
    this.activeHeader.fill(0);
    if (columnState % 3) {
      this.activeHeader[column] = columnState;
      rows.sort((a, b) => {
        if (columnState % 2) {
          if (a[column] > b[column]) return -1;
          if (a[column] < b[column]) return 1;
        } else {
          if (a[column] > b[column]) return 1;
          if (a[column] < b[column]) return -1;
        }
        return 0;
      });
      this.setState({
        tableHead: this.makeTableHead(head, column, columnState),
        tableRows: this.makeTableRows(rows),
      });
    } else {
      this.setState({
        tableHead: this.makeTableHead(head, -1, 0),
        tableRows: this.makeTableRows(this.defaultRows),
      });
    }
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
    const { redirect, goToUrl, rowsPrimaryKey } = this.props;
    const htmlCells = stringRows.map(el => (
      <TableRow
        key={el[0]}
        primaryKey={rowsPrimaryKey}
        elements={el}
        url={goToUrl}
        toRedirect={redirect}
      />
    ));
    return htmlCells;
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

AdminTable.defaultProps = {
  title: '',
  margin: '0 auto',
  redirect: () => {},
  goToUrl: '',
  rowsPrimaryKey: 0,
};

AdminTable.propTypes = {
  title: PropTypes.string,
  margin: PropTypes.string,
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  rowsPrimaryKey: PropTypes.number,
  head: PropTypes.arrayOf(PropTypes.string).isRequired,
  redirect: PropTypes.func,
  goToUrl: PropTypes.string,
};
