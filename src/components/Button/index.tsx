import React from 'react';

 import { Container } from './styles';

const Button: React.FC = (props) => {
    const {children} = props
  return (
      <Container>
          <button
          {...props}
          >

{children}
          </button>
      </Container>
  )
}

export default Button;