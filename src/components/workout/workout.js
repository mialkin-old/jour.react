import React from 'react'

export default class Workout extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            workouts: [{ id: 1, name: 'Бег' }, { id: 2, name: 'Подтягивания' }]
        };
    }

    render() {

        const listItems = this.state.workouts.map((w) =>
            <li key={w.id}>{w.name}</li>
        );

        return (
            <div>
                Тренировки
                <div>
                    <ol>
                        {listItems}
                    </ol>
                </div>
            </div>
        )
    }

    componentDidMount() {

    }
}