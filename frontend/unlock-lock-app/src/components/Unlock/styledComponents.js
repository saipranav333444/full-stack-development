import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #3c2940, #0b0c1e);
  color: #ffffff;
  font-family: 'Roboto';
`

export const Content = styled.div`
  text-align: center;
`

export const LockImage = styled.img`
  width: 150px;
  height: 150px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
  }

  @media (max-width: 480px) {
    width: 100px;
    height: 100px;
  }
`

export const Message = styled.p`
  font-size: 24px;
  margin-bottom: 20px;
  font-family: 'Roboto';
  @media (max-width: 768px) {
    font-size: 20px;
    font-family: 'Roboto';
  }

  @media (max-width: 480px) {
    font-size: 18px;
    font-family: 'Roboto';
  }
`

export const Button = styled.button`
  padding: 10px 20px;
  font-size: 18px;
  color: #ffffff;
  background-color: #06b6d4;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0b0c1e;
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 16px;
  }

  @media (max-width: 480px) {
    padding: 6px 12px;
    font-size: 14px;
  }
`
