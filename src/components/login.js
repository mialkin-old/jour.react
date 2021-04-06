import React from 'react'
import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: window.JOUR_BASE_URL
})

export default class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
    }

    render() {
        return (
            <div>
                <h1>Вход</h1>
                <div>
                    Пользователь: <input
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleChange} />
                </div>
                <div>
                    Пароль: <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange} />
                </div>
                <div>
                    <button type="button" onClick={this.handleSignIn}>Войти</button>
                </div>
            </div>
        )
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }

    handleSignIn() {

        instance
            .post(`login/sign-in`, {
                username: this.state.username,
                password: this.state.password
            })
            .then(res => {

                if (res.data.success === true) {
                    this.props.updateAuthStatus(true);
                } else {
                    alert(res.data.errorMessage);
                }
            });
    }
}