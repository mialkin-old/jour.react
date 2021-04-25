import React from 'react';
import axios from 'axios';
import TagsDropdown from '../tags/tags-dropdown';
import TodoDuration from './todo-duration'
import './todo.css';
import '../tags/tag.css';

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
            title: '',
            tagId: 0
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.updateTag = this.updateTag.bind(this);
    }

    render() {

        return (
            <div className="todo">
                <div className="header">
                    <h1>Список дел</h1>
                    <div>
                        <div style={{ margin: '0 0 20px 0' }}>
                            <input
                                style={{ width: 500 }}
                                name="title"
                                value={this.state.title}
                                onChange={this.handleChange} />

                            <TagsDropdown updateTag={this.updateTag} />
                            <button onClick={this.handleCreate}>Добавить</button>
                        </div>
                    </div>
                </div>
                <div className="active">
                    <h2>Активные</h2>
                    <div>
                        {this.state.active.map((todo) =>
                            <div key={todo.todoId}>
                                {todo.title}
                                <TodoDuration />                                
                                {todo.tags.map((tag) =>
                                    <span key={tag.tagId} className="tag">{tag.title}</span>
                                )}
                                <button onClick={() => this.handleComplete(todo.todoId)}>↓ завершить</button>
                                <button onClick={() => this.handleDelete(todo.todoId, todo.title, true)}>удалить</button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="inactive">
                    <h2>Завершенные</h2>
                    <div>
                        {this.state.inactive.map((todo) =>
                            <div key={todo.todoId}>
                                {todo.title}
                                <button onClick={() => this.handleUncomplete(todo.todoId)}>↑ активировать</button>
                                <button onClick={() => this.handleDelete(todo.todoId, todo.title, false)}>удалить</button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="short">
                    <h2>Короткие</h2>
                    <div>
                        asdfasdf asdf
                        asdf
                        as
         
                    </div>
                </div>
                <div className="long">
                    <h2>Долгие</h2>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.loadAll();
    }

    loadAll() {
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
                title: this.state.title,
                tagId: this.state.tagId
            })
            .then(res => {
                instance.get(`todo/active`)
                    .then(res => {
                        this.setState({
                            active: res.data,
                            title: ''
                        });
                    })
            });
    }

    handleDelete(id, title, isActive) {

        if (window.confirm(`Удалить "${title}" ?`)) {
            instance
                .post(`todo/delete`, {
                    id: id
                })
                .then(res => {
                    if (isActive) {
                        this.loadActive();
                    } else {
                        this.loadInactive();
                    }
                });
        }
    }

    handleComplete(id) {
        instance
            .post(`todo/complete`, {
                id: id
            })
            .then(res => {
                this.loadAll();
            });
    }

    handleUncomplete(id) {
        instance
            .post(`todo/uncomplete`, {
                id: id
            })
            .then(res => {
                this.loadAll();
            });
    }

    updateTag(id) {
        this.setState({
            tagId: id
        })
    }
}