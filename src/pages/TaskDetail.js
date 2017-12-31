import React, { Component } from 'react'
import './TaskDetail.css'
import TaskHistory from '../components/TaskHistory'
import { Button, Row, Col } from 'react-bootstrap'
import api from '../services/api'

class TaskDetail extends Component {
  state = {}

  componentDidMount() {
    api(`/task/${this.props.match.params.id}`)
      .then(body => Promise.all[body, api(`/delivery`)])
  }

  render() {
    const { task } = this.state
    const { isTeacher = false } = this.props

    if (!task) {
      return <div>Loading...</div>
    }

    return <div className='TaskDetail container'>
      <Row>
        <Col xs={12} md={6} sm={12}>
          <h2>{task.name}</h2>
          <h4>By {task.issuer}</h4>
          <h6>Issue Date: {task.issueDate}</h6>
          {
            isTeacher ? <div className="acceptTask">
              <h4>Splněno zadání</h4>
              <Button>Ano</Button>
              <Button>Ne</Button>
            </div> :
              <form className='upload-form'>
                <div className="form-group">
                  <label htmlFor="file">Upload file(s)</label>
                  <input id="file" name="file" type="file" className="form-control-file" multiple />
                </div>
              </form>
          }
          <div>
            <TaskHistory />
            {
              isTeacher ?
                <Button style={{ marginTop: '5px', marginBottom: '5px' }}>Vyhodnotit</Button> :
                <Button style={{ marginTop: '5px', marginBottom: '5px' }}>Potvrdit odevzdani</Button>
            }
          </div>
        </Col>
        <Col className="description" xs={10} md={6} sm={12}>{task.definition}</Col>
      </Row>

    </div>
  }
}

export default TaskDetail
