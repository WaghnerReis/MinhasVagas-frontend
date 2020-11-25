import styled from 'styled-components';

export const JobOpeningsList = styled.div`
margin-top: 40px;

a {
  background: #fff;
  border-radius: 5px;
  width: 100%;
  padding: 24px;
  display: block;
  text-decoration: none;
  transition: transform 0.2s;

  display: flex;
  align-items: center;

  &:hover {
    transform: translateX(10px)
  }

  & + a {
    margin-top: 16px;
  }

  img + div {
    display: flex;
    flex-direction: column;
  }
}

img {
  width: 64px;
  height: 64px;
  margin-right: 16px;
}

div {
  width: 100%;
  overflow: hidden;
    
  strong {
    font-size: 20px;
    color: #3d3d4d;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

`;

export const Content = styled.div`
display: flex;
flex-direction: row;

p {
  width: 33%;
  font-size: 18px;
  color: #a8a8b3;
  margin-top: 4px;
  margin-right: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
`
