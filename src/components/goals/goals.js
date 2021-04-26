import React from 'react'
import axios from 'axios';
import { formatDate } from './../helpers';

const instance = axios.create({
    withCredentials: true,
    baseURL: window.JOUR_BASE_URL
})

export default class Goals extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            goals: [],
            title: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    render() {

        return (
            <div>
                <h1>Планы</h1>
                <div>
                    <div style={{ margin: '0 0 20px 0' }}>
                        <input
                            style={{ width: 200 }}
                            name="title"
                            value={this.state.title}
                            onChange={this.handleChange} />

                        <button onClick={this.handleCreate}>Добавить</button>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Название</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.goals.map((goal) =>
                            <tr key={goal.goalId}>
                                <td>{goal.title}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }

    componentDidMount() {

        this.load();

    }

    load() {
        instance.get(`goal/list`)
            .then(res => { this.setState({ goals: res.data }); })
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }

    handleCreate() {
        instance
            .post(`goal/create`, {
                title: this.state.title
            })
            .then(res => {

                this.setState({
                    title: ''
                });

                this.load();

            });
    }

    handleDelete(id) {
        instance
            .post(`goal/delete`, {
                id: id
            })
            .then(res => {
                this.load();
            });
    }
}