import React from 'react'
import axios from 'axios';
import {formatDate} from './../helpers';

const instance = axios.create({
    withCredentials: true,
    baseURL: window.JOUR_BASE_URL
})

export default class Goals extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            goals: []
        };
    }

    render() {

        return (
            <div>
                Цели
                <table>
                    <thead>
                        <tr>
                            <th>Название</th>
                            <th>Дата создания</th>
                            <th>Метки</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.goals.map((goal) =>
                            <tr key={goal.goalId}>
                                <td>{goal.title}</td>
                                <td>{formatDate(goal.dateCreated)}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }

    componentDidMount() {

        instance.get(`goal/list`)
            .then(res => { this.setState({ goals: res.data }); })

    }
}