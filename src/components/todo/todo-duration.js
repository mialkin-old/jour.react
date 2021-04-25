import './todo-duration.css'

export default function TodoDuration(props) {
  return (
    <span className="todo-duration">
      <input className="input-hours" maxlength="2">{props.hours}</input>ч. 
      <input className="input-minutes" maxlength="2">{props.minutes}</input>мин.
    </span>
  )
}