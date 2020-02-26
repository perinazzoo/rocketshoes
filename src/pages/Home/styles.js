import styled from 'styled-components';
import { darken } from 'polished';

import appear from '../../util/appear';

export const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  list-style: none;

  li {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 4px;
    padding: 20px;

    animation: ${appear} 0.4s;

    img {
      align-self: center;
      max-width: 250px;
    }

    > strong {
      font-size: 16px;
      line-height: 20px;
      color: #333;
      margin-top: 5px;
      margin-bottom: auto;
    }

    > span {
      font-size: 21px;
      font-weight: bold;
      margin: 5px 0 10px;
    }

    button {
      background-color: #27ae60;
      color: #fff;
      border: 0;
      border-radius: 4px;
      overflow: hidden;

      display: flex;
      align-items: center;
      transition: background-color 0.25s;

      &:hover {
        background-color: ${darken(0.05, '#27ae60')};
      }

      div {
        display: flex;
        align-items: center;
        padding: 12px;
        background-color: rgba(0, 0, 0, 0.1);

        svg {
          margin-right: 5px;
        }
      }

      span {
        flex: 1;
        text-align: center;
        font-weight: bold;
      }
    }
  }
`;
