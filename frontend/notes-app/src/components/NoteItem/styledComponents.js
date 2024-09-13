// styledComponents.js
import styled from 'styled-components'

export const ListItem = styled.li`
  list-style: none;
`

export const NoteItemContainer = styled.div`
  border: 2px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  font-family: 'Roboto', sans-serif;
  margin-bottom: 20px;
`

export const NoteTitle = styled.h1`
  font-size: 24px;
  color: #333;
`

export const NoteDescription = styled.p`
  font-size: 16px;
  color: #666;
`

export const Divider = styled.hr`
  border: 0;
  height: 1px;
  background: #ddd;
  margin: 10px 0;
`
