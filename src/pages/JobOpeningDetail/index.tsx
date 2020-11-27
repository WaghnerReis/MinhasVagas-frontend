import React from 'react';

import { useHistory, useRouteMatch } from 'react-router-dom';

import { useQuery } from "@apollo/client";
import {JOB_OPENING} from '../../graphql/jobOpenings'

import { Button } from "../../components";
import { Container, Content, Actions } from './styles';

interface ParamsData {
  id: string
}

const JobOpeningDetail: React.FC = () => {
  const {params} = useRouteMatch<ParamsData>()

  const history = useHistory();
  const handleEditJobOpeningClick = () => history.push(`/CreateEditJobOpening/${params.id}`);

  const { loading, error, data } = useQuery(JOB_OPENING, {variables: {
    id: params.id
  }});

  if (loading) return <p>Loading...</p>;
  if (error) {
      alert('Erro ao recuperar dados do servidor. Verique sua conexão e tente novamente')
      history.push('/')
      return <div></div>
    }

  return (
    <>
      <Container>
  <strong>{data.jobOpening.name}</strong>
        <Content>
          <img 
          src={data.jobOpening.company.logo}
          alt='logo da empresa'
          />

          <div>
            <strong>{data.jobOpening.company.name}</strong>
            <p>{data.jobOpening.company.address}</p>
              
            <div>
              <p>{data.jobOpening.remuneration}</p>
              <p>{data.jobOpening.nivel}</p>
              <p>{data.jobOpening.contract}</p>
            </div>
          </div>
        </Content>

        <h1>Sobre da empresa</h1>
        <p>{data.jobOpening.company.description}</p>

        <h1>Atividades e responasbilidades</h1>
        <p>{data.jobOpening.activitiesAndResponsibilities}</p>

        <h1>Requisitos</h1>
        <p>{data.jobOpening.requirements}</p>

        <h1>O que oferecemos</h1>
        <p>{data.jobOpening.company.whatWeOffer}</p>
      </Container>
      <Actions>
        <Button onClick={handleEditJobOpeningClick}>Editar</Button>
        <Button mode='cancel'>Excluir</Button>
      </Actions>
    </>
  )
}

export default JobOpeningDetail;