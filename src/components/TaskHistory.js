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

        const { windowHistory, windowId } = this.props
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
                    <tbody>
                        {
                            windowHistory.map(version => {
                                if (windowId === version.taskDeliveryWindow) {
                                    return (
                                        <tr key={version.id}>
                                            {/*<td>{version.name}</td>*/}
                                            <td> {version.deliveryDate}</td><td><a>{i18n('TaskDetail.TaskHistory.download', 'Download').toLowerCase()}</a></td></tr>
                                    )
                                }
                                return null
                            })
                        }
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default TaskHistory
