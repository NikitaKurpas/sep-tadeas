import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './TaskDetail.css'
import TaskHistory from '../components/TaskHistory'
import { Button, Row, Col } from 'react-bootstrap'
import api from '../services/api'
import i18n from '../services/i18n'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as taskActions from '../actions/actions'


class TaskDetail extends Component {
  state = {}

  componentDidMount() {
    // api(`/task/${this.props.match.params.id}`)
    //   .then(body => Promise.all([body, api(`/delivery`)]))
    //   .then(([task, delivery]) => {
    //     // TODO: idk how to get deliveries for the task...
    //   })
    const { actions, ownProps: { match } } = this.props
    actions.fetchTaskDetail(match.params.id)
  }

  render() {
    const { task } = this.state
    const { user } = this.props

    const isTeacher = user.role === 'teacher'

    if (!task) {
      return <div className="container">Loading...</div>
    }

    return <div className='TaskDetail container'>
      <Row>
        <Col xs={12} md={6} sm={12}>
          <h2>{task.name}</h2>
          <h4>{i18n('TaskDetail.by', "By")} {task.issuer}</h4>
          <h6>{i18n('TaskDetail.issueDate', 'Issue Date')}: {task.issueDate}</h6>
          {
            isTeacher ? (
              <div className="acceptTask">
                <h4>{i18n('TaskDetail.teacher.isTaskCompleted', 'Is task completed?')}</h4>
                <Button>{i18n('TaskDetail.teacher.yes', 'Yes')}</Button>
                <Button>{i18n('TaskDetail.teacher.no', 'No')}</Button>
              </div>
            ) : (
                <form className='upload-form'>
                  <div className="form-group">
                    <label htmlFor="file">{i18n('TaskDetail.uploadButton', 'Upload file')}</label>
                    <input id="file" name="file" type="file" className="form-control-file" />
                  </div>
                </form>
              )
          }
          <div>
            <TaskHistory />
            {
              isTeacher
                ? <Button style={{ marginTop: '5px', marginBottom: '5px' }}>{i18n('TaskDetail.teacher.evaluate', 'Evaluate')}</Button>
                : <Button style={{ marginTop: '5px', marginBottom: '5px' }}>{i18n('TaskDetail.confirmSubmission', 'Confirm submission')}</Button>
            }
          </div>
        </Col>
        <Col className="description" xs={10} md={6} sm={12}>{task.definition}</Col>
      </Row>

    </div>
  }
}

TaskDetail.propTypes = {
  match: PropTypes.object.isRequired,
  isTeacher: PropTypes.bool
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(taskActions, dispatch)
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.reducer,
    ownProps
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetail)
