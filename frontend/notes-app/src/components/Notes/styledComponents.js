import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
  font-family: 'Roboto';
`

export const Heading = styled.h1`
  font-family: 'Bree Serif', serif;
  color: #4c63b6;
  font-size: 30px;
  text-align: center;
`

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%; /* Adjusted to 100% to match the FormContainer */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 8px;
`

export const Input = styled.input`
  /* Changed to input */
  margin: 10px;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
`

export const AddButton = styled.button`
  background-color: #4c63b6;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  align-self: flex-end;
  margin-top: 10px;
`

export const EmptyStateImage = styled.img`
  width: 200px;
  height: auto;
  display: block;
  margin: 20px auto;
`

export const NotesListContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* Allow wrapping on smaller screens */
  gap: 20px; /* Space between items */
  justify-content: start; /* Center items horizontally */
  width: 80%;
`

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%; /* Form takes up 80% of the width */
  text-align: center;
`
