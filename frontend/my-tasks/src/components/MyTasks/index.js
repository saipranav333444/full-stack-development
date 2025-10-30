import {Component} from 'react'
import {v4 as uuid} from 'uuid'
import Tags from '../Tags'
import Tasks from '../Tasks'
import './index.css'

const tagsList = [
  {optionId: 'HEALTH', displayText: 'Health'},
  {optionId: 'EDUCATION', displayText: 'Education'},
  {optionId: 'ENTERTAINMENT', displayText: 'Entertainment'},
  {optionId: 'SPORTS', displayText: 'Sports'},
  {optionId: 'TRAVEL', displayText: 'Travel'},
  {optionId: 'OTHERS', displayText: 'Others'},
]

class MyTasks extends Component {
  state = {
    taskName: '',
    tagName: tagsList[0].optionId,
    myTaskList: [],
    activeTag: '',
  }

  submitTask = event => {
    event.preventDefault()
    const {taskName, tagName} = this.state
    const taskDetails = {id: uuid(), taskName, tagName}
    this.setState(prevState => ({
      taskName: '',
      tagName: tagsList[0].optionId,
      myTaskList: [...prevState.myTaskList, taskDetails],
    }))
  }

  onChangeTaskName = event => {
    this.setState({taskName: event.target.value})
  }

  renderTaskField = () => {
    const {taskName} = this.state
    return (
      <div className="input-field-group">
        <label htmlFor="task" className="field-label">
          Task
        </label>
        <input
          type="text"
          value={taskName}
          placeholder="Enter the task here"
          onChange={this.onChangeTaskName}
          className="text-input"
          id="task"
        />
      </div>
    )
  }

  onChangeTag = event => {
    this.setState({tagName: event.target.value})
  }

  renderTagsField = () => {
    const {tagName} = this.state
    return (
      <div className="input-field-group">
        <label htmlFor="tags" className="field-label">
          Tags
        </label>
        <select
          className="text-input"
          onChange={this.onChangeTag}
          value={tagName}
          id="tags"
        >
          {tagsList.map(tagDetails => (
            <option value={tagDetails.optionId} key={tagDetails.optionId}>
              {tagDetails.displayText}
            </option>
          ))}
        </select>
      </div>
    )
  }

  onClickTag = id => {
    const {activeTag} = this.state
    this.setState({activeTag: id === activeTag ? '' : id})
  }

  render() {
    const {activeTag, myTaskList} = this.state
    const filteredList = myTaskList.filter(item => item.tagName === activeTag)
    const currentTasks = activeTag === '' ? myTaskList : filteredList

    return (
      <div className="tasks-app-container">
        <div className="task-create-section">
          <h1 className="app-main-heading">Create a Task!</h1>
          <form onSubmit={this.submitTask} className="task-form">
            {this.renderTaskField()}
            {this.renderTagsField()}
            <button className="add-task-btn" type="submit">
              Add Task
            </button>
          </form>
        </div>
        <div className="tasks-display-section">
          <h1 className="section-heading">Tags</h1>
          <ul className="tags-list">
            {tagsList.map(item => (
              <Tags
                key={item.optionId}
                tagDetails={item}
                activeTag={activeTag}
                onClickTag={this.onClickTag}
              />
            ))}
          </ul>
          <h1 className="section-heading">Tasks</h1>
          {myTaskList.length > 0 ? (
            <ul className="task-items-list">
              {currentTasks.map(item => (
                <Tasks key={item.id} taskDetails={item} />
              ))}
            </ul>
          ) : (
            <p className="empty-tasks-text">No Tasks Added Yet</p>
          )}
        </div>
      </div>
    )
  }
}

export default MyTasks
