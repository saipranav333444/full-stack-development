import {Component} from 'react'
import './index.css'

class RegistrationForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    showFirstNameError: false,
    showLastNameError: false,
    isFormSubmitted: false,
  }

  onChangeFirstName = event => {
    this.setState({firstName: event.target.value})
  }

  onChangeLastName = event => {
    this.setState({lastName: event.target.value})
  }

  onBlurFirstName = () => {
    const {firstName} = this.state
    if (firstName === '') {
      this.setState({showFirstNameError: true})
    } else {
      this.setState({showFirstNameError: false})
    }
  }

  onBlurLastName = () => {
    const {lastName} = this.state
    if (lastName === '') {
      this.setState({showLastNameError: true})
    } else {
      this.setState({showLastNameError: false})
    }
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {firstName, lastName} = this.state

    if (firstName !== '' && lastName !== '') {
      this.setState({isFormSubmitted: true})
    } else {
      this.setState({
        showFirstNameError: firstName === '',
        showLastNameError: lastName === '',
        isFormSubmitted: false,
      })
    }
  }

  onClickSubmitAnother = () => {
    this.setState({
      firstName: '',
      lastName: '',
      showFirstNameError: false,
      showLastNameError: false,
      isFormSubmitted: false,
    })
  }

  renderForm = () => {
    const {firstName, lastName, showFirstNameError, showLastNameError} =
      this.state
    return (
      <form className="form-container" onSubmit={this.onSubmitForm}>
        <div className="input-container">
          <label className="input-label" htmlFor="firstName">
            FIRST NAME
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            className={
              showFirstNameError
                ? 'name-input-field error-field'
                : 'name-input-field'
            }
            placeholder="First name"
            onChange={this.onChangeFirstName}
            onBlur={this.onBlurFirstName}
          />
          {showFirstNameError && <p className="error-message">Required</p>}
        </div>

        <div className="input-container">
          <label className="input-label" htmlFor="lastName">
            LAST NAME
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            className={
              showLastNameError
                ? 'name-input-field error-field'
                : 'name-input-field'
            }
            placeholder="Last name"
            onChange={this.onChangeLastName}
            onBlur={this.onBlurLastName}
          />
          {showLastNameError && <p className="error-message">Required</p>}
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    )
  }

  renderSuccess = () => (
    <div className="success-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
        alt="success"
        className="success-image"
      />
      <p>Submitted Successfully</p>
      <button
        type="button"
        className="submit-button"
        onClick={this.onClickSubmitAnother}
      >
        Submit Another Response
      </button>
    </div>
  )

  render() {
    const {isFormSubmitted} = this.state

    return (
      <div className="registration-form-container">
        <h1 className="form-title">Registration</h1>
        <div className="view-container">
          {isFormSubmitted ? this.renderSuccess() : this.renderForm()}
        </div>
      </div>
    )
  }
}

export default RegistrationForm
