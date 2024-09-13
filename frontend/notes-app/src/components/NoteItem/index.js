import {
  NoteItemContainer,
  NoteTitle,
  NoteDescription,
  Divider,
  ListItem,
} from './styledComponents'

const NoteItem = props => {
  const {noteDetails} = props
  const {titleValue, noteValue} = noteDetails

  return (
    <ListItem>
      <NoteItemContainer>
        <NoteTitle>{titleValue}</NoteTitle>
        <Divider />
        <NoteDescription>{noteValue}</NoteDescription>
      </NoteItemContainer>
    </ListItem>
  )
}

export default NoteItem
