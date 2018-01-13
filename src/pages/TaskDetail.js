import React, { Component } from 'react'
import './TaskDetail.css'
import TaskHistory from '../components/TaskHistory';
import { Button, Row, Col } from 'react-bootstrap';

class TaskDetail extends Component {
  state = {
    task: {
      id: 1,
      name: 'Task #1',
      issuer: 'Issuer A',
      issueDate: '1st January 2018',
      active: true,
      definition: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin mi justo, ultricies ac porttitor ut, porttitor pharetra velit. Curabitur lacinia nulla eu risus tincidunt porta. Nam id turpis purus. Phasellus id eros nec risus placerat viverra et vel augue. Sed porttitor libero sapien, nec convallis diam consectetur in. Praesent iaculis ante eget odio consequat egestas. Etiam mattis gravida eros. Pellentesque id condimentum quam. Nullam scelerisque diam nec neque cursus ornare.\n' +
        '\n' +
        'Nulla sit amet tellus ut odio efficitur tristique ac a purus. Nullam quis dictum lorem, ac aliquet mi. Phasellus laoreet rhoncus augue eget posuere. Quisque mauris lorem, bibendum quis magna vitae, iaculis bibendum mi. Sed mattis eu eros ac luctus. Mauris vel commodo turpis. Maecenas luctus sem dolor, ac facilisis mi tincidunt ut.'
    }
  }
  render() {
    const { task } = this.state

    var isTeacher = true; //TODO: dostat jako props na zaklade role, ovlinuje vykresleni

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
          {/* <div className="file-list"> */}
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
