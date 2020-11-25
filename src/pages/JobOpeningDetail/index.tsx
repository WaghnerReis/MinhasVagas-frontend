import React from 'react';

import { Container, Content } from './styles';

const JobOpeningDetail: React.FC = () => {
  return (
    <Container>
      <strong>Desenvolvedor(a) Outsystems</strong>
      <Content>
        <img 
        src='https://res.cloudinary.com/programathor/image/upload/c_fit,h_130,w_130/v1533232812/vpb1cvcuaryahzdhta5q.jpg'
        alt='logo da empresa'
        />

        <div>
          <strong>Organização Verdemar LTDA</strong>
          <p>Av. Nossa Senhora do Carmo, 1900, Sion</p>
            
          <div>
            <p>15.000</p>
            <p>Sênior</p>
            <p>PJ</p>
            <p>Aceita candidatos de outra cidade</p>
          </div>
        </div>
      </Content>

      <h1>Sobre da empresa</h1>
      <p>Organização Verdemar LTDA</p>

      <h1>Atividades e responasbilidades</h1>
      <p>Desenvolver novos produtos e serviços utilizando a tecnologia Outsystems. Pesquisar e identificar tecnologias e soluções oferecidas pelo mercado. Realizar manutenção evolutiva e corretiva de produtos e serviços existentes. Contatar fornecedores de equipamentos e softwares, esclarecendo dúvidas técnicas diversas, repassando necessidades, especificações e solicitando orçamentos. Monitorar o desempenho e a performance dos produtos e serviços desenvolvidos. Realizar reuniões de acompanhamento dos projetos, alinhando atividades realizadas x planejadas avaliando o cumprimento de etapas.</p>

      <h1>Requisitos</h1>
      <p>Linguagem de Programação Outsystems, Lógica de Programação, HTML, CSS, JavaScript, WebService, Inglês Avançado, Banco de Dados, C#</p>

      <h1>O que oferecemos</h1>
      <p>Seguro de Vida, Plano Odontológico, Plano de Saúde, Vale Transporte, Alimentação na empresa</p>
    </Container>
  )
}

export default JobOpeningDetail;