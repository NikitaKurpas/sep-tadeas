import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './Dashboard.css'
import {Table} from 'react-bootstrap' 

class Dashboard extends Component {
  state = {
    data: [{
      id: 1,
      name: 'Task #1',
      issuer: 'A',
      issueDate: '1st January',
      active: true,
      definition: ''
    }, {
      id: 1,
      name: 'Task #2',
      issuer: 'B',
      issueDate: '2st January',
      active: false,
      definition: ''
    }],
    sortOrder: 1,
    sortProp: 'name',
    search: ''
  }

  sortData = prop => event => {
    this.setState(Object.assign(this.state, {
      sortOrder: this.state.sortOrder * -1,
      sortProp: prop
    }))
  }

  handleTaskClick = taskId => event => {
    console.log(taskId);
    this.props.history.push(`/tasks/${taskId}`)
  }

  handleSearch = event => {
    const target = event.target;
    const value = target.value;

    this.setState(Object.assign(this.state, {
      search: value
    }))
  }

  render () {
    let data = this.state.data;
    // filter
    if (this.state.search && this.state.search.length) {
      const val = this.state.search.toLowerCase();
      data = data.filter(item => item.name.toLowerCase().includes(val) || item.issuer.toLowerCase().includes(val))
    }
    // sort
    const sortProp = this.state.sortProp;
    const sortOrder = this.state.sortOrder;
    data = data.sort((a, b) => a[sortProp] < b[sortProp] ? -1 * sortOrder : a[sortProp] > b[sortProp] ? sortOrder : 0)

    return <div className='Dashboard container'>
      <form className='form-inline' onSubmit={this.search}>
        <input type="text"
               className="form-control mb-2 mr-sm-2 mb-sm-0"
               placeholder='Search term'
               value={this.state.search}
               onChange={this.handleSearch}/>
        {/*<button type="submit" className='btn btn-outline-primary'>Search</button>*/}
      </form>
      <Table className='table table-hover table-bordered'>
        <thead className='thead-inverse'>
          <tr>
            <th onClick={this.sortData('name')}>Task name</th>
            <th onClick={this.sortData('issuer')} width='300'>Issuer</th>
            <th onClick={this.sortData('issueDate')} width='200'>Issue date</th>
            <th onClick={this.sortData('active')} width='40'/>
          </tr>
        </thead>
        <tbody>
        {data.map((item, key) => (
          <tr key={key} onClick={this.handleTaskClick(item.id)}>
            <td>{item.name}</td>
            <td>{item.issuer}</td>
            <td>{item.issueDate}</td>
            <td>
              <input type='checkbox' checked={item.active} readOnly/>
            </td>
          </tr>
        ))}
        </tbody>
      </Table>
    </div>
  }
}

export default withRouter(Dashboard)
