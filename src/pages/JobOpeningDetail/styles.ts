import styled from 'styled-components';

export const Container = styled.div`
width: 100%;
padding: 20px;
border-radius: 5px;
background: #fff;

display: flex;
flex-direction: column;

strong, h1 {
    font-size: 30px;
    color: #3d3d4d;
}

h1 {
    margin-top: 20px;
}

strong {
    text-align: center;
    margin-bottom: 20px;
}

p {
    font-size: 18px;
    color: #a8a8b3;
}
`;

export const Content = styled.div`
display: flex;
align-items: center;

p + div {
    display: flex;
    margin-top: 20px;
    p {
        margin-right: 20px;
    }
}

img {
    width: 100px;
    height: 100px;
    margin-right: 16px;
}

strong {
    font-size: 20px;
}
`