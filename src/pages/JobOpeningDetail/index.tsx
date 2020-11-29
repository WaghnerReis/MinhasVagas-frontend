import React, {useCallback, useEffect, useState} from 'react';

import { useJobOpening } from "../../hooks/jobOpening";

import { useHistory, useRouteMatch } from 'react-router-dom';

import { JobOpening } from "../../interfaces";

import { Button } from "../../components";
import { Container, Content, Actions } from './styles';

interface ParamsData {
  id: string
}

interface History {
  refreshId: number
}

const JobOpeningDetail: React.FC = () => {
  const [jobOpening, setJobOpening] = useState({} as JobOpening)

  const {params} = useRouteMatch<ParamsData>()
  const history = useHistory<History>();

  const handleEditJobOpeningClick = useCallback(()=>{
    history.push(`/CreateEditJobOpening/${params.id}`);
  }, [history, params.id])

  const { jobOpeningRequest } = useJobOpening()

  useEffect(()=> {
     async function getJobOpeningByID(){
      const jobOpening = await jobOpeningRequest(params.id)
      setJobOpening(jobOpening)
    }
    getJobOpeningByID()
  }, [jobOpeningRequest, params.id, history.location.key])

  return (
    <>
    { jobOpening ? 
      <>
      <Container>
  <strong>{jobOpening?.name}</strong>
        <Content>
          <img 
          src={jobOpening?.company?.logo}
          alt='logo da empresa'
          />

          <div>
            <strong>{jobOpening?.company?.name}</strong>
            <p>{jobOpening?.company?.address}</p>
              
            <div>
              <p>{jobOpening?.remuneration}</p>
              <p>{jobOpening?.nivel}</p>
              <p>{jobOpening?.contract}</p>
            </div>
          </div>
        </Content>

        <h1>Sobre da empresa</h1>
        <p>{jobOpening?.company?.description}</p>

        <h1>Atividades e responasbilidades</h1>
        <p>{jobOpening?.activitiesAndResponsibilities}</p>

        <h1>Requisitos</h1>
        <p>{jobOpening?.requirements}</p>

        <h1>O que oferecemos</h1>
        <p>{jobOpening?.company?.whatWeOffer}</p>
      </Container>
      <Actions>
        <Button onClick={handleEditJobOpeningClick}>Editar</Button>
        <Button mode='cancel'>Excluir</Button>
      </Actions>
      </>
      : <p>Loading...</p>
    }
    </>
  )
}

export default JobOpeningDetail;