import React from 'react';

import {Link, useHistory} from 'react-router-dom'

import { JobOpeningsList, Content } from './styles';
import {Button} from '../../components'

const JobOpenings: React.FC = () => {
    const history = useHistory();
    const handleCreateJobOpeningClick = () => history.push('/CreateEditJobOpening');

    return (
        <>
            <Button onClick={handleCreateJobOpeningClick} >
                Criar anúncio de vaga
            </Button>
            <JobOpeningsList>
                <Link to='/JobOpeningDetail'>
                    <img
                    src='https://res.cloudinary.com/programathor/image/upload/c_fit,h_100,w_100/v1591118389/fq2f7xfcca8orrej66pc.jpg'
                    alt='logo da empresa'
                    />

                    <div>
                        <strong>Desenvolvedor(a) Full Stack Sênior</strong>  
                        <Content>
                            <p>Nome da Empresa</p>
                            <p>Local</p>
                            <p>Salário</p>
                        </Content>

                        <Content>
                            <p>Senioridade</p>
                            <p>contratacao</p>
                            <p></p>
                        </Content>
                    </div>
                </Link>
            </JobOpeningsList>
        </>
    )
}

export default JobOpenings;