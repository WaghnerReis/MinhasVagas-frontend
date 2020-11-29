import React, { useCallback, useEffect, useState } from 'react';

import { JobOpening } from "../../interfaces";

import { useJobOpening } from "../../hooks/jobOpening";

import {Link, useHistory} from 'react-router-dom'

import { JobOpeningsList, Content } from './styles';
import {Button} from '../../components'

const JobOpenings: React.FC = () => {
  const [jobOpenings, setJobOpenings] = useState<[JobOpening]>()

    const history = useHistory();

    const handleCreateJobOpeningClick = useCallback(()=>{
        history.push('/CreateEditJobOpening/_');
    }, [history])

    const { jobOpeningsRequest } = useJobOpening()

    useEffect(()=> {
        async function getJobOpenings(){
         const jobOpenings = await jobOpeningsRequest()
         setJobOpenings(jobOpenings)
       }
       getJobOpenings()
     }, [jobOpeningsRequest, history.location.key])

    const jobOpeningsSection = (jobOpenings: [JobOpening]) => (
    jobOpenings.length > 0 ?
        <JobOpeningsList>
                {
                    jobOpenings.map((jobOpening: any) => (
                <Link key={jobOpening._id} to={`/JobOpeningDetail/${jobOpening._id}`}>
                    <img
                    src={jobOpening.company.logo}
                    alt='logo da empresa'
                    />

                    <div>
                    <strong>{jobOpening.name}</strong>  
                        <Content>
                            <p>{jobOpening.company.name}</p>
                            <p>{jobOpening.company.address}</p>
                            <p>{jobOpening.remuneration}</p>
                        </Content>

                        <Content>
                            <p>{jobOpening.nivel}</p>
                            <p>{jobOpening.contract}</p>
                            <p></p>
                        </Content>
                    </div>
                </Link>
                    ))
                }
            </JobOpeningsList>
            :
            <h1>Nenhuma vaga encontrada</h1>
)

    return (
        <>
            {
                jobOpenings ? 
                    <>
                        <Button onClick={handleCreateJobOpeningClick} >
                            Criar anúncio de vaga
                        </Button>
                        {
                            jobOpeningsSection(jobOpenings)
                        }
                    </>
                : <p>Loading...</p>
            }
        </>
    )
}

export default JobOpenings;