import React, { useCallback, useRef } from 'react';

import * as Yup from 'yup'
import { getValidationErrors } from "../../util";

import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";

import Input from '../../components/Input';
import { Container } from './styles';

const CreateEditJobOpening: React.FC = () => {
const formRef = useRef<FormHandles>(null)

const INITIAL_DATA= {
  jobOpening: 'Desenvolvedor(a) Outsystems',
  nivel: 'Sênior',
  contract: 'PJ',
  acceptAnotherCity: true,
  activitiesAndResponsibilities: 'Desenvolver novos produtos e serviços utilizando a tecnologia Outsystems. Pesquisar e identificar tecnologias e soluções oferecidas pelo mercado. Realizar manutenção evolutiva e corretiva de produtos e serviços existentes. Contatar fornecedores de equipamentos e softwares, esclarecendo dúvidas técnicas diversas, repassando necessidades, especificações e solicitando orçamentos. Monitorar o desempenho e a performance dos produtos e serviços desenvolvidos. Realizar reuniões de acompanhamento dos projetos, alinhando atividades realizadas x planejadas avaliando o cumprimento de etapas.',
  requirements: 'Linguagem de Programação Outsystems, Lógica de Programação, HTML, CSS, JavaScript, WebService, Inglês Avançado, Banco de Dados, C#',
  whatWeOffer: 'Seguro de Vida, Plano Odontológico, Plano de Saúde, Vale Transporte, Alimentação na empresa',

  companyLogo: 'https://res.cloudinary.com/programathor/image/upload/c_fit,h_130,w_130/v1533232812/vpb1cvcuaryahzdhta5q.jpg',
  companyName: 'Organização Verdemar LTDA',
  companyAddress: 'Av. Nossa Senhora do Carmo, 1900, Sion',
  companyDescription: 'Organização Verdemar LTDA',  
  remuneration: '12.000',
  }

  const handleSubmit = useCallback(async data=>{
try{
const schema = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
})

await schema.validate(data, {
  abortEarly: false
})
}catch(err){
const errors = getValidationErrors(err)
formRef.current?.setErrors(errors)
}
  }, [])

  return (
<Container>
    <Form ref={formRef} initialData={INITIAL_DATA} onSubmit={handleSubmit}>
     
    <Input name='jobOpening' placeholder='Informe a vaga' />

<div>
<img 
 src={INITIAL_DATA.companyLogo}
 alt='logo da empresa'
/>

<Input name='companyName' placeholder='Informe o nome da empresa' />

<div>

<Input name='companyAddress' placeholder='Informe o endereço da empresa' />
<Input name='remuneration' placeholder='Informe o nome da empresa' />

</div>

<div>


           <Input name='nivel' placeholder='Informe o endereço da empresa' />
<Input name='contract' placeholder='Informe o nome da empresa' />
<Input name='acceptAnotherCity' placeholder='Informe o nome da empresa' />

</div>

</div>

<h1>Sobre da empresa</h1>
<Input name='companyDescription' placeholder='Informe o endereço da empresa' />


<h1>Atividades e responasbilidades</h1>
<Input name='activitiesAndResponsibilities' placeholder='Informe o endereço da empresa' />


<h1>Requisitos</h1>
<Input name='requirements' placeholder='Informe o endereço da empresa' />


<h1>O que oferecemos</h1>
<Input name='whatWeOffer' placeholder='Informe o endereço da empresa' />



    </Form>
</Container>

  )
}

export default CreateEditJobOpening;