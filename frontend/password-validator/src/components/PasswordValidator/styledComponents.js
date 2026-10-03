import styled from 'styled-components'

export const OuterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #24263c;
`

export const InnerContainer = styled.div`
  background-color: #475569;
  padding: 50px;
  border-radius: 10px;
  text-align: center;
`

export const Heading = styled.h1`
  color: white;
  font-family: 'Roboto', sans-serif;
  font-size: 50px;
`

export const Description = styled.p`
  color: white;
  font-family: 'Roboto', sans-serif;
`

export const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: none;
  outline: none;
  font-family: 'Roboto', sans-serif;
  margin-top: 40px;
`

export const ErrorMessage = styled.p`
  color: red;
  font-family: 'Roboto', sans-serif;
  margin-top: 10px;
  font-size: 10px;
`
