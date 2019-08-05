import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TableHead from './Head';
import TableRow from './Row';
import TableCaption from './Caption';
import PageNumber from '../PageNumber';

import './style.css';

/*
  PARA UTILIZAR ESSE COMPONENTE É NECESSÁRIO ENVOLVÊ-LO EM UMA TAG:
  TABLECONTEXT, MESMO QUE O VALUE SEJA UM OBJETO VAZIO.
*/

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: null,
      tableRows: null,
      pages: 0,
    };
  }

  componentDidMount() {
    const { head, columnSortKey } = this.props;
    this.setState({
      tableHead: this.makeTableHead(head, -1, 0),
      tableRows: this.makeTableRows(this.initialSort(columnSortKey)),
    });
    this.activeHeader = Array(2).fill(0); // [coluna-atual, status]
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
    const toTimeStamp = [a, b];
    const result = Array(toTimeStamp.length);
    for (let i = 0; i < result.length; i += 1) {
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
    const { maxRowsPerPage } = this.props;
    console.log(maxRowsPerPage);
    this.setState({ pages: Math.ceil(stringRows.length / maxRowsPerPage) });
    const htmlCells = stringRows.map(el => <TableRow key={el[0]} elements={el} />);
    return htmlCells;
  };

  handleSort = (column) => {
    const { rows, head, dateFields } = this.props;
    let columnState;
    if (this.activeHeader[0] === column) {
      columnState = this.activeHeader[1] + 1;
    } else {
      this.activeHeader[0] = column;
      columnState = 1;
    }
    const columnIsDate = dateFields.indexOf(column) !== -1;
    if (columnState % 3) {
      this.activeHeader[1] = columnState;
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

  pageNumber = (e) => {
    console.log(e);
  }

  render() {
    const { title, margin } = this.props;
    const { tableRows, tableHead, pages } = this.state;
    return (
      <div className="admin-table-wrapper">
        <table className="admin" style={{ margin }} cellPadding="0" cellSpacing="0">
          <caption style={{ display: title.length ? null : 'none' }}>
            {title}
            <TableCaption orderingColors={['#d61818', '#347dd6', '#2964ad']} />
          </caption>
          <thead>
            <tr>{tableHead}</tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
        {pages && <PageNumber handleClick={this.pageNumber} elementsPerPage={pages} />}
      </div>
    );
  }
}

Table.defaultProps = {
  title: '',
  margin: '0 auto',
  dateFields: [],
};

Table.propTypes = {
  title: PropTypes.string,
  margin: PropTypes.string,
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  columnSortKey: PropTypes.number.isRequired,
  head: PropTypes.arrayOf(PropTypes.string).isRequired,
  dateFields: PropTypes.arrayOf(PropTypes.number),
  maxRowsPerPage: PropTypes.number.isRequired,
};
