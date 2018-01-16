import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Dashboard.css'
import { Table, Column, Cell } from 'fixed-data-table-2'
import { TextCell } from '../components/Cells'
import { connect } from 'react-redux'
import i18n from '../services/i18n'

import { bindActionCreators } from 'redux'
import * as fetchActions from '../actions/actions'

class DataListWrapper {
  constructor(indexMap, data) {
    this._indexMap = indexMap;
    this._data = data;
  }

  getSize() {
    return this._indexMap.length;
  }

  getObjectAt(index) {
    return this._data.getObjectAt(
      this._indexMap[index],
    );
  }
}

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this._dataList = props.tasks;
    this.state = {
      filteredDataList: this._dataList,
    };

    this._onFilterChange = this._onFilterChange.bind(this);
  }

  _onFilterChange(e) {
    if (!e.target.value) {
      this.setState({
        filteredDataList: this._dataList,
      });
    }

    var filterBy = e.target.value.toLowerCase();
    var size = this._dataList.getSize();
    var filteredIndexes = [];
    for (var index = 0; index < size; index++) {
      var { firstName } = this._dataList.getObjectAt(index);
      if (firstName.toLowerCase().indexOf(filterBy) !== -1) {
        filteredIndexes.push(index);
      }
    }

    this.setState({
      filteredDataList: new DataListWrapper(filteredIndexes, this._dataList),
    });
  }

  componentDidMount() {
    const { actions } = this.props
    actions.fetchDashboard()
  }

  componentWillReceiveProps(nextProps) {
    this._dataList = nextProps.tasks;
    this.setState({
      filteredDataList: nextProps.tasks
    })
  }

  handleTaskClick = taskId => event => {
    console.log(taskId);
    this.props.history.push(`/task/${taskId}`)
  }

  handleSearch = event => {
    const target = event.target;
    const value = target.value;

    this.setState(Object.assign(this.state, {
      search: value
    }))
  }




  render() {
    const { tasks, loading } = this.props
    const { data } = this.state
    var { filteredDataList } = this.state;

    // Intermediate state before retrieving data
    if (!this.state.filteredDataList.length) {
      return (
        <div className="container">Loading...</div>
      )
    }

    console.log("data", this.state.rows)
    if (!this.state.filteredDataList.length) {
      return (
        <div className="container">No tasks</div>
      )
    }

    return (
      <div className='Dashboard container'>
        <Table
          rowHeight={50}
          rowsCount={filteredDataList.length}
          headerHeight={50}
          width={1000}
          height={500}
          {...this.props}>
          <Column
            columnKey="id"
            header={<Cell>ID</Cell>}
            cell={<TextCell data={filteredDataList} />}
            fixed={true}
            width={50}
          />
          <Column
            columnKey="name"
            header={<Cell>{i18n('Dashboard.table.name', 'Task name')}</Cell>}
            cell={<TextCell data={filteredDataList} />}
            fixed={true}
            width={200}
          />
          <Column
            columnKey="issuer"
            header={<Cell>{i18n('Dashboard.table.issuer', 'Issuer')}</Cell>}
            cell={<TextCell data={filteredDataList} />}
            fixed={true}
            width={200}
          />
          <Column
            columnKey="issueDate"
            header={<Cell>{i18n('Dashboard.table.issueDate', 'Issue date')}</Cell>}
            cell={<TextCell data={filteredDataList} />}
            width={200}
          />
          <Column
            columnKey="active"
            header={<Cell>{i18n('Dashboard.table.active', 'Active')}</Cell>}
            cell={<TextCell data={filteredDataList} />}
            width={60}
          />
        </Table>
      </div>
    )
  }
}

Dashboard.propTypes = {
  history: PropTypes.object.isRequired
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(fetchActions, dispatch)
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.reducer,
    ownProps
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
