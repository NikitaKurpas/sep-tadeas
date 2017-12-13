import React, { Component } from 'react'
import { Table } from 'react-bootstrap'


const styles = {
    table: {
        padding: '20px',
        border: '1px #ccc solid',
        height: '300px',
        maxWidth: '400px',
        background: '#ffffff'
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
]

class TaskHistory extends Component {

    render() {
        return (
            <Table style={styles.table}>
                <thead>
                    <tr>
                        <th>Název</th>
                        <th>Datum</th>
                        <th>Stáhnout</th>
                    </tr>
                </thead>
                {
                    history.map(version => {
                        return (
                            <tr><td>{version.name}</td><td> {version.date}</td><td><a href="#">stahnout</a></td></tr>
                        )
                    })
                }
            </Table>
        )
    }
}

export default TaskHistory
