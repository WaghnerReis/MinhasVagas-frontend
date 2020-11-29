import React, { useCallback, useRef, useState, useEffect } from 'react';

import { useJobOpening } from "../../hooks/jobOpening";

import {useHistory, useRouteMatch} from  'react-router-dom'

import { JobOpening } from "../../interfaces";

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
  const [jobOpening, setJobOpening] = useState({} as JobOpening)
  const [isEdit, setIsEdit] = useState(true)

  const history = useHistory();
  const { params } = useRouteMatch<ParamsData>()
  const formRef = useRef<FormHandles>(null)

  const { jobOpeningRequest, updateJobOpeningRequest, createJobOpeningRequest } = useJobOpening()

  useEffect(()=> {
    async function getJobOpeningByID(){
      if(params.id === "_") {
        setIsEdit(false)
        return
      }
      
      const jobOpening = await jobOpeningRequest(params.id)
      setJobOpening(jobOpening)
    }
    getJobOpeningByID()
  }, [jobOpeningRequest, params.id])

  const handleSubmit = useCallback(async (data: JobOpening) => {
    try {
      formRef.current?.setErrors({})

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

      if(isEdit){
        updateJobOpeningRequest(jobOpening._id, jobOpening.company._id, data)
        
        history.push(`/JobOpeningDetail/${jobOpening._id}`)
      } else {
        createJobOpeningRequest(data)

        history.push('/')
      }
      
  } catch (err) {
      const errors = getValidationErrors(err)
      formRef.current?.setErrors(errors)
    }
  }, [createJobOpeningRequest, history, isEdit, jobOpening, updateJobOpeningRequest])

  let INITIAL_DATA: JobOpening = {
      _id: jobOpening?._id,
      name: jobOpening?.name,
      nivel: jobOpening?.nivel,
      contract: jobOpening?.contract,
      activitiesAndResponsibilities: jobOpening?.activitiesAndResponsibilities,
      requirements: jobOpening?.requirements,
      remuneration: jobOpening?.remuneration,
    
      company: {
        _id: jobOpening?.company?._id,
        logo: jobOpening?.company?.logo,
        name: jobOpening?.company?.name,
        address: jobOpening?.company?.address,
        description: jobOpening?.company?.description,  
        whatWeOffer: jobOpening?.company?.whatWeOffer,
        }
  }

  return (
    <>
      { jobOpening ? 
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
        : <p>Loading...</p>
      }
    </>
    )
}

export default CreateEditJobOpening;