import styled, {css} from 'styled-components';
import { shade } from "polished";

interface ButtonProps {
  mode?: 'common' | 'cancel'
}

const buttonTypeVariations = {
  common: css`
  background: #064ce3;
  &:hover {
    background: ${shade(0.2, '#064ce3')}
  }
  `,
  cancel: css`
  background: red;
  &:hover {
    background: ${shade(0.2, 'red')}
  }
  `,
}

export const Container = styled.button<ButtonProps>`
  width: 100%;

  height: 70px;
  border-radius: 5px;
  border: 0;
  color: #fff;
  font-weight: bold;
  font-size: 20px;
  transition: background-color 0.2s;
  margin-top: 20px;

  ${props => buttonTypeVariations[props.mode || 'common']}
`;
