import styled from 'styled-components'

export const Button = styled.button`
  background-color: ${({isActive}) => (isActive ? '#db1c48' : '#ffffff')};
  color: ${({isActive}) => (isActive ? '#ffffff' : '#db1c48')};
  border: 3px solid #db1c48; /* Increased border size */
  border-radius: 30px; /* Increased border-radius */
  padding: 12px; /* Increased padding */
  font-size: 3em; /* Increased font size */
`

// ListItem Component
export const ListItem = styled.li`
  list-style-type: none;
  margin: 30px; /* Increased margin */
`
