import React from 'react';

import { useQuery } from "@apollo/client";
import {JOB_OPENINGS} from '../../graphql/jobOpenings'

import {Link, useHistory} from 'react-router-dom'

import { JobOpeningsList, Content } from './styles';
import {Button} from '../../components'

const JobOpenings: React.FC = () => {
    const history = useHistory();
    const handleCreateJobOpeningClick = () => history.push('/CreateEditJobOpening/_');

    const { loading, error, data } = useQuery(JOB_OPENINGS);

    if (loading) return <p>Loading...</p>;
    if (error) {
        alert('Erro ao recuperar dados do servidor. Verique sua conexão e tente novamente')
    }

    return (
        <>
            <Button onClick={handleCreateJobOpeningClick} >
                Criar anúncio de vaga
            </Button>

{
    data.jobOpenings.length > 0 ?
<JobOpeningsList>
                {
                    data.jobOpenings.map((jobOpening: any) => (
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
}
        </>
    )
}

export default JobOpenings;