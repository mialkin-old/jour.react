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
import Cooking from './cooking/cooking'
import Birthday from './birthday/birthday'
import './home.css'

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
                <Router>
                    <div className="navbar">
                        <ul>
                            <li>
                                <Link to="/">Панель управления</Link>
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
                            <li>
                                <Link to="/cooking">Кулинария</Link>
                            </li>
                            <li>
                                <Link to="/birthday">Дни рождения</Link>
                            </li>
                            <li>
                                <button type="button" onClick={this.handleSignOut}>Выйти</button>
                            </li>
                        </ul>
                        <hr />
                    </div>
                    <div>
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
                            <Route path="/cooking">
                                <Cooking />
                            </Route>
                            <Route path="/birthday">
                                <Birthday />
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
            .then(res => { window.location.href = '/'; });
    }
}