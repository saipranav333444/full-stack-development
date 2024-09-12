import {useState} from 'react'

import {
  PageContainer,
  LeftSection,
  Heading,
  CreditCardContainer,
  RightSection,
  PaymentContainer,
  PaymentHeading,
  InputField,
  ParagraphElementNumber,
  ParagraphElementName,
} from './styledComponents'

const PaymentPage = () => {
  const [cardNumber, writeNumber] = useState('')
  const [cardName, writeName] = useState('')

  const onChangeNumber = event => {
    writeNumber(event.target.value)
  }

  const onChangeName = event => {
    writeName(event.target.value)
  }
  return (
    <PageContainer>
      <LeftSection>
        <Heading>Credit Card</Heading>
        <CreditCardContainer data-testid="creditCard">
          <ParagraphElementNumber>{cardNumber}</ParagraphElementNumber>
          <p>CARDHOLDER NAME</p>
          <ParagraphElementName>{cardName}</ParagraphElementName>
        </CreditCardContainer>
      </LeftSection>
      <RightSection>
        <PaymentContainer>
          <PaymentHeading>Payment Method</PaymentHeading>
          <InputField
            type="text"
            placeholder="Card Number"
            onChange={onChangeNumber}
          />
          <InputField
            type="text"
            placeholder="Cardholder Name"
            onChange={onChangeName}
          />
        </PaymentContainer>
      </RightSection>
    </PageContainer>
  )
}

export default PaymentPage
