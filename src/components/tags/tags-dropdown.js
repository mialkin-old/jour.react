import React from 'react'
import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: window.JOUR_BASE_URL
})

export default class TagsDropdown extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            tags: [],
            value: 0
        };

        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        return (
            <select value={this.state.value} onChange={this.handleChange}>
                <option value={0}>-- Не выбрано --</option>
                {this.state.tags.map((tag) =>
                    <option key={tag.tagId} value={tag.tagId}>
                        {tag.title}
                    </option>
                )}
            </select>
        )
    }

    componentDidMount() {
        this.load();
    }

    load() {
        instance.get(`tag/list`)
            .then(res => { this.setState({ tags: res.data }); })
    }

    handleChange(event) {
        var val = event.target.value;

        this.setState({
            value: val
        }, () => {
            this.props.updateTag(val);
        });
    }
}