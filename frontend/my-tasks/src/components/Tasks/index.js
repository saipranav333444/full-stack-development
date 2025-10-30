import './index.css'

const Tasks = props => {
  const {taskDetails} = props
  const {taskName, tagName} = taskDetails

  return (
    <li className="task-list-item">
      <p className="task-name">{taskName}</p>
      <p className="task-tag">{tagName}</p>
    </li>
  )
}

export default Tasks
