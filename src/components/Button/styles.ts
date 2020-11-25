import styled from 'styled-components';
import { shade } from "polished";

export const Container = styled.button`
  width: 100%;

  height: 70px;
  background: #064ce3;
  border-radius: 5px;
  border: 0;
  color: #fff;
  font-weight: bold;
  font-size: 20px;
  transition: background-color 0.2s;

  &:hover{
background: ${shade(0.2, '#064ce3')}
  }
`;
