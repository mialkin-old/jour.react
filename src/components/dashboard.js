import React from 'react'
import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: window.JOUR_BASE_URL
})

export default class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };

        this.handleSignOut = this.handleSignOut.bind(this);
    }

    render() {
        return (
            <div>
                "This is the dashboard"
                <div>
                    <button type="button" onClick={this.handleSignOut}>Выйти</button>
                </div>
            </div>
        )
    }

    componentDidMount() {

    }

    handleSignOut() {

        instance
            .post(`login/sign-out`)
            .then(res => { this.props.updateAuthStatus(false); });
    }
}