import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import axios from 'axios';

import Dashboard from './dashboard/dashboard';
import ToDo from './todo/todo'
import Workout from './workout/workout'
import PUA from './pua/pua'

const instance = axios.create({
    withCredentials: true,
    baseURL: window.JOUR_BASE_URL
})

export default class Home extends React.Component {

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
                <div>
                    <button type="button" onClick={this.handleSignOut}>Выйти</button>
                </div>
                <Router>
                    <div>
                        <ul>
                            <li>
                                <Link to="/">Главная</Link>
                            </li>
                            <li>
                                <Link to="/todo">Список дел</Link>
                            </li>
                            <li>
                                <Link to="/workout">Тренировки</Link>
                            </li>
                            <li>
                                <Link to="/pua">PUA</Link>
                            </li>
                        </ul>

                        <hr />

                                        {/*
                        A <Switch> looks through all its children <Route>
                        elements and renders the first one whose path
                        matches the current URL. Use a <Switch> any time
                        you have multiple routes, but you want only one
                        of them to render at a time
                        */}
                        <Switch>
                            <Route exact path="/">
                                <Dashboard />
                            </Route>
                            <Route path="/todo">
                                <ToDo />
                            </Route>
                            <Route path="/workout">
                                <Workout />
                            </Route>
                            <Route path="/pua">
                                <PUA />
                            </Route>
                        </Switch>
                    </div>
                </Router>
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