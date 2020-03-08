import React from 'react';
import { useSelector } from 'react-redux';

import { Container } from './styles';
import loader from '../../assets/images/loader.svg';

export default function LoadingScreen() {
  const isLoading = useSelector(({ loading }) => loading);

  return (
    <Container isLoading={isLoading}>
      <div>
        <img src={loader} alt="loading" />
      </div>
    </Container>
  );
}
