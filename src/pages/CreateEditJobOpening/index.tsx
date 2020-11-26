import React, { useCallback, useRef } from 'react';

import * as Yup from 'yup'
import { getValidationErrors } from "../../util";

import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";

import { Button, Input } from '../../components';
import { Container } from './styles';

interface Company {
  logo: string,
  name: string,
  address: string,
  description: string,  
  whatWeOffer: string,
}

interface JobOpening {
  name: string,
  nivel: string,
  contract: string,
  activitiesAndResponsibilities: string,
  requirements: string,
  remuneration: string,  
  company: Company,  
}

const INITIAL_DATA: JobOpening = {
  name: 'Desenvolvedor(a) Outsystems',
  nivel: 'Sênior',
  contract: 'PJ',
  activitiesAndResponsibilities: 'Desenvolver novos produtos e serviços utilizando a tecnologia Outsystems. Pesquisar e identificar tecnologias e soluções oferecidas pelo mercado. Realizar manutenção evolutiva e corretiva de produtos e serviços existentes. Contatar fornecedores de equipamentos e softwares, esclarecendo dúvidas técnicas diversas, repassando necessidades, especificações e solicitando orçamentos. Monitorar o desempenho e a performance dos produtos e serviços desenvolvidos. Realizar reuniões de acompanhamento dos projetos, alinhando atividades realizadas x planejadas avaliando o cumprimento de etapas.',
  requirements: 'Linguagem de Programação Outsystems, Lógica de Programação, HTML, CSS, JavaScript, WebService, Inglês Avançado, Banco de Dados, C#',
  remuneration: '12.000',

  company: {
    logo: 'https://res.cloudinary.com/programathor/image/upload/c_fit,h_130,w_130/v1533232812/vpb1cvcuaryahzdhta5q.jpg',
    name: 'Organização Verdemar LTDA',
    address: 'Av. Nossa Senhora do Carmo, 1900, Sion',
    description: 'Organização Verdemar LTDA',  
    whatWeOffer: 'Seguro de Vida, Plano Odontológico, Plano de Saúde, Vale Transporte, Alimentação na empresa',
    }
  }

const CreateEditJobOpening: React.FC = () => {
const formRef = useRef<FormHandles>(null)

const handleSubmit = useCallback(async data => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().required('Informe o nome da vaga (Ex.: Desenvolvedor Frontend)'),
      nivel: Yup.string().required('Informe o nível (Ex.: Sênior)'),
      contract: Yup.string().required('Informe a forma de contratação (Ex.: PJ)'),
      activitiesAndResponsibilities: Yup.string().required("Informe as atividades e responsabilidades separadas por vírgula"),
      requirements: Yup.string().required("Informe os requisitos separados por vírgula"),
      remuneration: Yup.string().required("Informe a remuneração (Ex.: R$1.000,00)"),
      company: Yup.object().shape({
        logo: Yup.string().required('Informe a URL de uma imagem (Ex.: https://www.nkey.com.br/wp-content/uploads/2020/07/nkey.svg)'),
        name: Yup.string().required('Informe o nome da empresa (Ex.: nKey)'),
        address: Yup.string().required("Informe o endereço a empresa (Ex.: R. Patrício Farias, 131, Térreo, Cool2work Offices, Itacorubi, Florianópolis, SC)"),
        description: Yup.string().required("Fale um pouco sobre a empresa"),  
        whatWeOffer: Yup.string().required('Informe o que a empresa oferece separados por vírgula'),
        
      })
    })

    await schema.validate(data, {
      abortEarly: false
    })
} catch (err) {
    const errors = getValidationErrors(err)
    formRef.current?.setErrors(errors)
  }
}, [])

return (
  <Container>
    <Form ref={formRef} initialData={INITIAL_DATA} onSubmit={handleSubmit}>
      <strong>Vaga ofertada</strong>
      <Input name='name' placeholder='Informe a vaga'/>
    
      <strong>URL da logo da empresa</strong>
      <Input name='company.logo' placeholder='Informe a URL da logo da empresa'/>

      <strong>Nome da empresa</strong>
      <Input name='company.name' placeholder='Informe o nome da empresa'/>

      <strong>Endereço da empresa</strong>
      <Input name='company.address' placeholder='Informe o endereço da empresa'/>
  
      <strong>Remuneração</strong>
      <Input name='remuneration' placeholder='Informe remuneração'/>
  
      <strong>Nível exigido</strong>
      <Input name='nivel' placeholder='Informe o nível exigido'/>
  
      <strong>Forma de contrato</strong>
      <Input name='contract' placeholder='Informe a forma de contrato'/>
  
      <strong>Sobre da empresa</strong>
      <Input name='company.description' placeholder='Fale sobre a empresa'/>

      <strong>Atividades e responsabilidades</strong>
      <Input name='activitiesAndResponsibilities' placeholder='Fale sobre as atividades e responsabilidades'/>
     
      <strong>Requisitos</strong>
      <Input name='requirements' placeholder='Fale sobre os requisitos'/>

      <strong>O que oferecemos</strong>
      <Input name='company.whatWeOffer' placeholder='Fale sobre os benefícios'/>

      <Button type='submit'>Salvar</Button>
    
    </Form>
  </Container>
)
}

export default CreateEditJobOpening;