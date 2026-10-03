import {useState} from 'react'
import {
  Container,
  Content,
  LockImage,
  Message,
  Button,
} from './styledComponents'

const Unlock = () => {
  const [statusOfLock, changeStatus] = useState(true)

  const onClickingButton = () => {
    changeStatus(prevState => !prevState)
  }

  return (
    <Container>
      {statusOfLock ? (
        <Content>
          <LockImage
            src="https://assets.ccbp.in/frontend/hooks/lock-img.png"
            alt="lock"
          />
          <Message>Your Device is Locked</Message>
          <Button type="button" onClick={onClickingButton}>
            Unlock
          </Button>
        </Content>
      ) : (
        <Content>
          <LockImage
            src="https://assets.ccbp.in/frontend/hooks/unlock-img.png"
            alt="unlock"
          />
          <Message>Your Device is Unlocked</Message>
          <Button type="button" onClick={onClickingButton}>
            Lock
          </Button>
        </Content>
      )}
    </Container>
  )
}

export default Unlock
