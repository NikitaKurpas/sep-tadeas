import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Dashboard.css'
import { Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import i18n from '../services/i18n'

import { bindActionCreators } from 'redux'
import * as fetchActions from '../actions/actions'

class Dashboard extends Component {
  state = {
    sortOrder: 1,
    sortProp: 'name',
    search: ''
  }

  componentDidMount() {
    const { actions } = this.props
    actions.fetchDashboard()
  }

  componentWillReceiveProps(nextProps) {
    this.setState(Object.assign(this.state, {
      data: nextProps.tasks
    }))
  }

  sortData = prop => event => {
    this.setState(Object.assign(this.state, {
      sortOrder: this.state.sortOrder * -1,
      sortProp: prop
    }))
  }

  handleTaskClick = taskId => event => {
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
    let data = this.state.data;

    // Intermediate state before retrieving data
    if (!data) {
      return (
        <div className="container">Loading...</div>
      )
    }

    if (!data.length) {
      return (
        <div className="container">No tasks</div>
      )
    }

    // filter
    if (this.state.search && this.state.search.length) {
      const val = this.state.search.toLowerCase();
      data = data.filter(item => item.name.toLowerCase().includes(val) || item.issuer.toString().toLowerCase().includes(val))
    }
    // sort
    const sortProp = this.state.sortProp;
    const sortOrder = this.state.sortOrder;
    data = data.sort((a, b) => a[sortProp] < b[sortProp] ? -1 * sortOrder : a[sortProp] > b[sortProp] ? sortOrder : 0)

    return <div className='Dashboard container'>
      <form className='form-inline' onSubmit={this.search}>
        <input type="text"
          className="form-control mb-2 mr-sm-2 mb-sm-0"
          placeholder={i18n('Dashboard.searchPlaceholder', 'Search term')}
          value={this.state.search}
          onChange={this.handleSearch} />
        {/*<button type="submit" className='btn btn-outline-primary'>Search</button>*/}
      </form>
      <Table className='table table-hover table-bordered'>
        <thead className='thead-inverse'>
          <tr>
            <th onClick={this.sortData('name')}>{i18n('Dashboard.table.name', 'Task name')}</th>
            <th onClick={this.sortData('issuer')} width='300'>{i18n('Dashboard.table.issuer', 'Issuer')}</th>
            <th onClick={this.sortData('issueDate')} width='200'>{i18n('Dashboard.table.issueDate', 'Issue date')}</th>
            <th onClick={this.sortData('active')} width='40' />
          </tr>
        </thead>
        <tbody>
          {data.map((item, key) => (
            <tr key={key} onClick={this.handleTaskClick(item.id)}>
              <td>{item.name}</td>
              <td>{item.issuer}</td>
              <td>{item.issueDate}</td>
              <td>
                <input type='checkbox' checked={item.active} readOnly />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
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
