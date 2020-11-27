import React, { useCallback, useEffect, useRef } from 'react';

import { useQuery } from "@apollo/client";
import {JOB_OPENING} from '../../graphql/jobOpenings'

import {useRouteMatch, useHistory} from  'react-router-dom'

import * as Yup from 'yup'
import { getValidationErrors } from "../../util";

import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";

import { Button, Input } from '../../components';
import { Container } from './styles';

interface ParamsData {
  id: string
}

const CreateEditJobOpening: React.FC = () => {
const {params} = useRouteMatch<ParamsData>()
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

  const { loading, data } = useQuery(JOB_OPENING, {variables: {
    id: params.id
  }});

  if (loading) return <p>Loading...</p>;
  

let INITIAL_DATA = {
  name: data?.jobOpening.name,
    nivel: data?.jobOpening.nivel,
    contract: data?.jobOpening.contract,
    activitiesAndResponsibilities: data?.jobOpening.activitiesAndResponsibilities,
    requirements: data?.jobOpening.requirements,
    remuneration: data?.jobOpening.remuneration,
  
    company: {
      logo: data?.jobOpening.company.logo,
      name: data?.jobOpening.company.name,
      address: data?.jobOpening.company.address,
      description: data?.jobOpening.company.description,  
      whatWeOffer: data?.jobOpening.company.whatWeOffer,
      }
}

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