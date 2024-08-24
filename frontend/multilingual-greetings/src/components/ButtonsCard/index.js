import {ListItem, Button} from './styledComponents'

const ButtonsCard = props => {
  const {buttonDetail, buttonClick, isActive} = props
  const {id, buttonText} = buttonDetail

  const onClickButton = () => {
    buttonClick(id)
  }

  return (
    <ListItem>
      <Button isActive={isActive} type="button" onClick={onClickButton}>
        {buttonText}
      </Button>
    </ListItem>
  )
}

export default ButtonsCard
