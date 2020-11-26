import React, {TextareaHTMLAttributes, useEffect, useRef} from 'react';

 import { useField } from '@unform/core';
 import { Container } from './styles';

interface InputProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
    name: string;
}

const Input: React.FC<InputProps> = ({name, ...props}) => {
   const inputRef = useRef(null)
   const {fieldName, defaultValue, error, registerField} = useField(name)

useEffect(()=>{
    registerField({
        name: fieldName,
        ref: inputRef.current,
        path: 'value'
    })
}, [fieldName, registerField])

  return (
    <Container>
      <textarea ref={inputRef}
        defaultValue={defaultValue}
        rows={50}
        {...props}/>

      <p>{error}</p>
    </Container>
  )
}

export default Input;