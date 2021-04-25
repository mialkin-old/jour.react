import React from 'react';
import './todo-duration.css'

export default class TodoDuration extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      todoId: this.props.todoId,
      hours: this.props.hours,
      minutes: this.props.minutes
    };

    this.handleHoursChange = this.handleHoursChange.bind(this);
    this.handleMinutesChange = this.handleMinutesChange.bind(this);

  }

  render() {
    return (
      <span className="todo-duration">
        <input className="input-hours" min="0" max="23" name="hours" type="number" value={this.state.hours} onChange={this.handleHoursChange}></input>ч.
        <input className="input-minutes" min="0" max="59" name="minutes" type="number" value={this.state.minutes} onChange={this.handleMinutesChange}></input>мин.
      </span>
    )
  }

  handleHoursChange({ target }) {
    this.setState({
      [target.name]: target.value
    }, () => this.props.handleHoursChange(this.state.todoId, target.value));
  }

  handleMinutesChange({ target }) {
    this.setState({
      [target.name]: target.value
    }, () => this.props.handleMinutesChange(this.state.todoId, target.value));
  }
}