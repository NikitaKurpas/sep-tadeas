import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import i18n from '../services/i18n'

const styles = {
    table: {
        padding: '20px',
        border: '1px #ccc solid',
        height: '300px',
        maxWidth: '400px',
        background: '#ffffff',
        overflowX: 'hidden'
    }
}

class TaskHistory extends Component {

    render() {

        const { windowHistory } = this.props
        return (
            <div style={styles.table}>
                <Table >
                    <thead>
                        <tr>
                            {/*<th>{i18n('TaskDetail.TaskHistory.name', 'Name')}</th>*/}
                            <th>{i18n('TaskDetail.TaskHistory.date', 'Date')}</th>
                            <th>{i18n('TaskDetail.TaskHistory.download', 'Download')}</th>
                        </tr>
                    </thead>
                    {
                        windowHistory.map(version => {
                            return (
                                <tr>
                                {/*<td>{version.name}</td>*/}
                                <td> {version.deliveryDate}</td><td><a>{i18n('TaskDetail.TaskHistory.download', 'Download').toLowerCase()}</a></td></tr>
                            )
                        })
                    }
                </Table>
            </div>
        )
    }
}

export default TaskHistory
