import styled from 'styled-components';
import { darken } from 'polished';

import appear from '../../util/appear';

export const Container = styled.div`
  padding: 30px;
  background-color: #fff;
  border-radius: 4px;

  animation: ${appear} 0.3s;

  > footer {
    margin-top: 30px;
    display: flex;
    justify-content: space-between !important;
    align-items: center;
    width: 100%;

    > button {
      background-color: #27ae60;
      color: #fff;
      border: 0;
      border-radius: 4px;
      padding: 12px 20px;
      font-weight: bold;
      text-transform: uppercase;
      transition: background-color 0.25s;

      &:hover {
        background-color: ${darken(0.05, '#27ae60')};
      }
    }
  }
`;

export const ProductTable = styled.table`
  width: 100%;

  thead th {
    color: #999;
    text-align: left;
    padding: 12px;
  }

  th:nth-child(3) {
    text-align: center !important;
    padding-left: 0 !important;
  }

  tbody td {
    padding: 12px;
    border-bottom: 1px solid #eee;
  }

  img {
    height: 100px;
  }

  strong {
    color: #333;
    display: block;
  }

  span {
    display: block;
    margin-top: 5px;
    font-size: 18px;
    font-weight: bold;
  }

  div {
    display: flex;
    align-items: center;

    input {
      border: 1px solid #ddd;
      border-radius: 4px;
      color: #666;
      padding: 6px;
      width: 50px;
    }
  }

  button {
    background: none;
    border: 0;
    padding: 6px;

    display: flex;
    align-items: center;
  }
`;

export const Total = styled.div`
  display: flex;
  align-items: baseline;

  span {
    color: #999;
    font-weight: bold;
  }

  strong {
    font-size: 28px;
    margin-left: 5px;
  }
`;

export const EmptyCart = styled.div`
  color: #ccc;
  font-size: 16px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
  margin-bottom: 10px;
`;
