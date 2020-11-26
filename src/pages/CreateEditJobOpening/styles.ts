import styled from 'styled-components';

export const Container = styled.div`
width: 100%;
padding:  0 20px 20px 20px;
border-radius: 5px;
background: #fff;
box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

form {
    display: flex;
    flex-direction: column;
    
    strong {
        font-size: 30px;
        color: #3d3d4d;
        margin-top: 10px;
    }
}
`;
