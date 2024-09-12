import styled from 'styled-components'

export const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  font-family: 'Roboto';
`

export const LeftSection = styled.div`
  width: 50%;
  background-color: #344e7a;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  color: white;
`

export const Heading = styled.h1`
  margin-top: 20px;
`

export const CreditCardContainer = styled.div`
  background-image: url('https://assets.ccbp.in/frontend/hooks/credit-card-bg.png');
  background-size: cover;
  border-radius: 15px;
  height: 300px;
  margin-bottom: 20px;
  padding-top: 130px;
  padding-left: 55px;
`

export const ParagraphElementNumber = styled.p`
  font-size: 50px;
  font-weight: bold;
`

export const ParagraphElementName = styled.p`
  font-size: 25px;
  font-weight: 300;
`

export const RightSection = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f4;
`

export const PaymentContainer = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: center;
`

export const PaymentHeading = styled.h2`
  margin-bottom: 20px;
`

export const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  outline: none;
`
