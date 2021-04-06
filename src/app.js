import React from 'react';
import axios from 'axios';

import Dashboard from './components/dashboard';
import Loading from './components/loading';
import Login from './components/login';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: undefined
    };
  }

  render() {

    if (this.state.isAuthenticated === undefined) {
      return <Loading />
    }

    if (this.state.isAuthenticated === true) {
      return <Dashboard />
    }

    return <Login />
  }

  componentDidMount() {

    axios.get(`https://localhost:5501/api/v1/login/status`)
      .then(res => {
        this.setState({
          isAuthenticated: res.data
        });
      })
  }
}