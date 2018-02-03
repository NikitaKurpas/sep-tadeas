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
import Dropzone from 'react-dropzone'
import toastr from 'toastr'
import moment from 'moment'

class TaskDetail extends Component {
  constructor(props) {
    super(props)

    this.onDrop = this.onDrop.bind(this)
    this.sendDelivery = this.sendDelivery.bind(this)

    this.state = { file: [] }
  }

  componentDidMount() {
    const { actions, ownProps: { match } } = this.props
    actions.fetchTaskDetail(match.params.id)
    actions.fetchWindowHistory()
  }

  onDrop(file) {
    this.setState({
      file: file
    });
    const reader = new FileReader();
    reader.onload = () => {
      const arrayBuffer = reader.result;
      // do whatever you want with the file content
      this.setState({
        solution: arrayBuffer
      });
    };
    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.readAsArrayBuffer(file[0]);
  }

  sendDelivery() {
    const { actions, tasks, activeWindowId, user, windowHistory } = this.props
    var delivery = {}

    if (!this.state.file.length) {
      toastr.error('nothing to delivery')
    } else {
      var now = moment().format('YYYY-MM-DD');
      delivery.id = windowHistory.length + 1
      delivery.taskDeliveryWindow = tasks[activeWindowId].id
      delivery.solution = this.state.solution
      delivery.deliveryDate = now
      delivery.user = user.id
      delivery.valid = true

      actions.pushDelivery(delivery)
    }
  }

  render() {
    const { user, tasks, activeWindowId, issuer, loading, windowHistory } = this.props

    var task = tasks[activeWindowId]

    const isTeacher = user.UserRole === 'teacher'

    if (!task || loading) {
      return <div className="container">Loading...</div>
    }

    return <div className='TaskDetail container'>
      <Row>
        <Col xs={12} md={6} sm={12}>
          <h2>{task.name}</h2>
          <h4>{i18n('TaskDetail.by', "By")} {issuer.firstName + ' ' + issuer.lastName}</h4>
          <h6>{i18n('TaskDetail.issueDate', 'Issue Date')}: {task.issueDate}</h6>
          <h6>{i18n('TaskDetail.startDate', 'Start date')}: {task.startDate}</h6>
          <h6>{i18n('TaskDetail.deadlineDate', 'Deadline Date')}: {task.deadlineDate}</h6>
          {
            isTeacher ? (
              <div className="acceptTask">
                <h4>{i18n('TaskDetail.teacher.isTaskCompleted', 'Is task completed?')}</h4>
                <Button>{i18n('TaskDetail.teacher.yes', 'Yes')}</Button>
                <Button>{i18n('TaskDetail.teacher.no', 'No')}</Button>
              </div>
            ) : (
                // <div>
                //   <form className='upload-form' onSubmit={(e) => this.sendDelivery(e)} method="post" enctype="multipart/form-data">
                //     <div className="form-group">
                //       <label htmlFor="file">{i18n('TaskDetail.uploadButton', 'Upload file')}</label>
                //       <input id="file" name="file" type="file" className="form-control-file" />
                //     </div>
                //     <Button type="submit">{i18n('TaskDetail.saveFile', 'Save file')}</Button>
                //   </form>
                // </div>
                <div className="dropzone">
                  <Dropzone
                    // onDrop={(acceptedFiles) => this.onDrop(acceptedFiles)} 
                    onDrop={this.onDrop}
                    multiple={false} accept=".zip, .rar" className="fileDropzone">
                    {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
                      if (isDragActive) {
                        return <p>This file is supported</p>
                      }
                      if (isDragReject) {
                        return <p>This file is unsupported</p>
                      }
                      if (acceptedFiles.length) {
                        console.log("test: ", this.state.test)
                        return <span><img src={this.state.file[0].preview} /> {this.state.file[0].name}</span>
                      }
                      if (rejectedFiles.length) {
                        return `Unsuported file`
                      }
                      return <p>{i18n('TaskDetail.uploadMessage', 'Upload message')}</p>
                    }}
                  </Dropzone>
                </div>
              )
          }
          <div>
            <TaskHistory windowHistory={windowHistory} />
            {
              isTeacher
                ? <Button style={{ marginTop: '5px', marginBottom: '5px' }}>{i18n('TaskDetail.teacher.evaluate', 'Evaluate')}</Button>
                : <Button style={{ marginTop: '5px', marginBottom: '5px' }} onClick={this.sendDelivery}> {i18n('TaskDetail.confirmSubmission', 'Confirm submission')}</Button>
            }
          </div>
        </Col>
        <Col className="description" xs={10} md={6} sm={12}>{task.definition}</Col>
      </Row>
    </div >
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
