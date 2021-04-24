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
            tags: []
        };

    }

    render() {
        return (
            <div>
                <h2>Метки</h2>
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
}