import {useState} from 'react'
import {v4 as uuidV4} from 'uuid'
import NoteItem from '../NoteItem'

// Import styled-components from StyledComponents.js
import {
  Container,
  Heading,
  InputContainer,
  Input,
  AddButton,
  EmptyStateImage,
  NotesListContainer,
  FormContainer,
} from './styledComponents'

const Notes = () => {
  const [titleValue, setTitle] = useState('')
  const [noteValue, setNote] = useState('')
  const [notesList, setNotesList] = useState([])

  const onChangeTitle = event => {
    setTitle(event.target.value)
  }

  const onChangeNote = event => {
    setNote(event.target.value)
  }

  const onSubmit = event => {
    event.preventDefault() // Prevent the form from submitting and refreshing the page
    const newNoteItem = {
      id: uuidV4(),
      titleValue,
      noteValue,
    }
    setNotesList(prevState => [...prevState, newNoteItem])
    setNote('')
    setTitle('')
  }

  return (
    <Container>
      <Heading>Notes</Heading>

      <FormContainer onSubmit={onSubmit}>
        <InputContainer>
          <Input
            type="text" // Ensure input type is text
            placeholder="Title"
            onChange={onChangeTitle}
            value={titleValue}
          />
          <Input
            as="textarea" // Textarea for note content
            placeholder="Take a Note..."
            onChange={onChangeNote}
            value={noteValue}
          />
          <AddButton type="submit">Add</AddButton>
        </InputContainer>
      </FormContainer>

      {/* Conditional rendering for empty state */}
      {notesList.length === 0 ? (
        <div>
          <EmptyStateImage
            src="https://assets.ccbp.in/frontend/hooks/empty-notes-img.png"
            alt="notes empty"
          />
          <h1>No Notes Yet</h1>
          <p>Notes you add will appear here</p>
        </div>
      ) : (
        <NotesListContainer>
          {notesList.map(eachItem => (
            <NoteItem key={eachItem.id} noteDetails={eachItem} />
          ))}
        </NotesListContainer>
      )}
    </Container>
  )
}

export default Notes
