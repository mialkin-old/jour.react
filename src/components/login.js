import React from 'react'

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

        localStorage.setItem('jwt_token', 'sign in')
        window.location.href = '/';

        // axios
        //     .post(`${window.slova.authServer.url}/auth/login`, {
        //         username: this.state.username,
        //         password: this.state.password
        //     })
        //     .then(res => {
        //         const token = res.data.token;
        //         localStorage.setItem('jwt_token', token)
        //         window.location.href = '/';
        //     });
    }
}