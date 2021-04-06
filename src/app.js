import React from 'react';
import axios from 'axios';

import Dashboard from './components/dashboard';
import Loading from './components/loading';
import Login from './components/login';

const instance = axios.create({
  withCredentials: true,
  baseURL: window.JOUR_BASE_URL
})

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.updateAuthStatus = this.updateAuthStatus.bind(this)

    this.state = {
      isAuthenticated: undefined
    };
  }

  updateAuthStatus(status) {
    this.setState({
      isAuthenticated: status
    });
  }

  render() {

    if (this.state.isAuthenticated === undefined) {
      return <Loading />
    }

    if (this.state.isAuthenticated === true) {
      return <Dashboard updateAuthStatus={this.updateAuthStatus} />
    }

    return <Login updateAuthStatus={this.updateAuthStatus} />
  }

  componentDidMount() {

    instance.get(`login/status`)
      .then(res => { this.setState({ isAuthenticated: res.data }); })

  }
}