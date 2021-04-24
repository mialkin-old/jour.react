import React from 'react'
import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: window.JOUR_BASE_URL
})

export default class ToDo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            active: [],
            inactive: [],
            title: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    render() {

        return (
            <div>
                <h1>Список дел</h1>
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
                <div>
                    <h2>Активные</h2>
                    <div>
                        {this.state.active.map((toDo) =>
                            <div key={toDo.toDoId}>
                                {toDo.title} <button>↓ завершить</button><button>удалить</button>
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    <h2>Завершенные</h2>
                    <div>
                        {this.state.inactive.map((toDo) =>
                            <div key={toDo.toDoId}>
                                {toDo.title} <button>↑ активировать</button>
                                <button onClick={() => this.handleDelete(toDo.toDoId)}>удалить</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {

        this.loadActive();
        this.loadInactive();
    }

    loadActive() {
        instance.get(`todo/active`)
            .then(res => { this.setState({ active: res.data }); })
    }

    loadInactive() {
        instance.get(`todo/inactive`)
            .then(res => { this.setState({ inactive: res.data }); })
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }

    handleCreate() {
        instance
            .post(`todo/create`, {
                title: this.state.title
            })
            .then(res => {
                instance.get(`todo/active`)
                    .then(res => {
                        this.setState({
                            toDos: res.data,
                            title: ''
                        });
                    })
            });
    }

    handleDelete(id) {

        instance
            .post(`todo/delete`, {
                id: id
            })
            .then(res => {
                this.load();
            });
    }
}