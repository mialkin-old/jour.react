import React from 'react'
import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: window.JOUR_BASE_URL
})

export default class Tags extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            tags: [],
            title: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    render() {
        return (
            <div>
                <h2>Метки</h2>
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
                    {this.state.tags.map((tag) =>
                        <div key={tag.tagId}>
                            {tag.title}
                        </div>
                    )}
                </div>
            </div>
        )
    }


    componentDidMount() {
        this.load();
    }

    load() {
        instance.get(`tag/list`)
            .then(res => { this.setState({ tags: res.data }); })
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }

    handleCreate() {
        instance
            .post(`tag/create`, {
                title: this.state.title
            })
            .then(res => {
                instance.get(`tag/list`)
                    .then(res => {
                        this.setState({
                            tags: res.data,
                            title: ''
                        });
                    })
            });
    }

    handleDelete(id) {

        instance
            .post(`tag/delete`, {
                id: id
            })
            .then(res => {
                this.load();
            });
    }
}