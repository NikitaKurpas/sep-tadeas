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

const history = [
    {
        name: "test.zip",
        date: "12-12-2017"
    },
    {
        name: "test.zip",
        date: "8-12-2017"
    },
    {
        name: "test_v2.zip",
        date: "6-12-2017"
    },
    {
        name: "test_v4.zip",
        date: "5-12-2017"
    },
    {
        name: "test_v2.zip",
        date: "2-12-2017"
    },
    {
        name: "test_v4.zip",
        date: "1-12-2017"
    },
    {
        name: "test_v2.zip",
        date: "6-12-2017"
    },
    {
        name: "test_v4.zip",
        date: "5-12-2017"
    },
    {
        name: "test_v2.zip",
        date: "2-12-2017"
    },
    {
        name: "test_v4.zip",
        date: "1-12-2017"
    },
    {
        name: "test_v2.zip",
        date: "2-12-2017"
    },
    {
        name: "test_v4.zip",
        date: "1-12-2017"
    },
    {
        name: "test_v2.zip",
        date: "6-12-2017"
    },
    {
        name: "test_v4.zip",
        date: "5-12-2017"
    },
    {
        name: "test_v2.zip",
        date: "2-12-2017"
    },
    {
        name: "test_v4.zip",
        date: "1-12-2017"
    },
]

class TaskHistory extends Component {

    render() {
        return (
            <div style={styles.table}>
                <Table >
                    <thead>
                        <tr>
                            <th>{i18n('TaskDetail.TaskHistory.name', 'Name')}</th>
                            <th>{i18n('TaskDetail.TaskHistory.date', 'Date')}</th>
                            <th>{i18n('TaskDetail.TaskHistory.download', 'Download')}</th>
                        </tr>
                    </thead>
                    {
                        history.map(version => {
                            return (
                                <tr><td>{version.name}</td><td> {version.date}</td><td><a>{i18n('TaskDetail.TaskHistory.download', 'Download').toLowerCase()}</a></td></tr>
                            )
                        })
                    }
                </Table>
            </div>
        )
    }
}

export default TaskHistory
