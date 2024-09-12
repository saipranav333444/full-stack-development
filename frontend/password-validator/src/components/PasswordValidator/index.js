import {useState} from 'react'
import {
  OuterContainer,
  InnerContainer,
  Heading,
  Description,
  Input,
  ErrorMessage,
} from './styledComponents'

const PasswordValidator = () => {
  const [password, setPassword] = useState('')
  const [warningMessage, setWarningMessage] = useState(true)

  const onChangePassword = event => {
    const newPassword = event.target.value
    setPassword(newPassword)

    // Check if the password length is less than 8
    if (newPassword.length < 8) {
      setWarningMessage(true)
    } else {
      setWarningMessage(false)
    }
  }

  return (
    <OuterContainer>
      <InnerContainer>
        <Heading>Password Validator</Heading>
        <Description>Check how strong and secure is your password</Description>
        <Input
          value={password}
          type="password"
          onChange={onChangePassword}
          placeholder="Enter your password"
        />
        {warningMessage ? (
          <ErrorMessage>
            Your password must be at least 8 characters
          </ErrorMessage>
        ) : (
          ''
        )}
      </InnerContainer>
    </OuterContainer>
  )
}

export default PasswordValidator
