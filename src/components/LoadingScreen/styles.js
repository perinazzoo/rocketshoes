import styled, { css, keyframes } from 'styled-components';
import appear from '../../util/appear';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  display: ${props => (props.isLoading ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(34, 34, 34, 0.6);
  z-index: 99 !important;

  animation: ${appear} 0.5s;

  div {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;

    ${props =>
    props.isLoading &&
    css`
        img {
          width: 100px;
          animation: ${rotate} 0.5s linear infinite;
        }
      `}
  }
`;
