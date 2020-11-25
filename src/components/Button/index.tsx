import React, {ButtonHTMLAttributes} from 'react';

 import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  mode?: 'common' | 'cancel'
}

const Button: React.FC<ButtonProps> = ({children, ...props}) => {
  return (
    <Container
      {...props}>
        {children}
    </Container>
  )
}

export default Button;