import React from 'react'
import Tags from '../tags/tags';

export default class Dashboard extends React.Component {

    render() {
        return (
            <div>
                <h1>Панель управления</h1>
                <div>
                    <Tags />
                </div>
            </div>
        )
    }
}