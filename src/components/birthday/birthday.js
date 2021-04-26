import React from 'react'
import axios from 'axios';
import './birthday.css'

const instance = axios.create({
    withCredentials: true,
    baseURL: window.JOUR_BASE_URL
})

export default class Birthday extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            birthdays: []
        };
    }

    render() {

        return (
            <div className="birthdays">
                <h1>Дни рождения в этом году</h1>
                <div>
                    {this.state.birthdays.map((month) =>
                        <div className={month.hasActiveBirthdays ? 'active' : 'inactive'} key={month.month}>
                            <h2>{month.monthText}</h2>
                            <div>{month.birthdays.map((bd) =>
                                <div className={bd.isActive ? 'active' : 'inactive'} key={bd.birthdayId}>
                                    <span className="day">{bd.day}</span> {bd.firstName} {bd.lastName}
                                </div>)
                            }</div>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    componentDidMount() {

        instance.get(`birthday/list`)
            .then(res => { this.setState({ birthdays: res.data }); })

    }
}