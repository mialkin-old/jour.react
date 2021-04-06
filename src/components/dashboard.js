import React from 'react'
import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://localhost:5501/'
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
            .post(`https://localhost:5501/api/v1/login/sign-out`)
            .then(res => {

                // if (res.data.success === true) {
                //     alert(res.data.success)
                // } else {
                //     alert(res.data.errorMessage);
                // }

                // const token = res.data.token;
                // window.location.href = '/';
            });
    }
}