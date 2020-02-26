import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Container } from './styles';
import loader from '../../assets/images/loader.svg';

function LoadingScreen({ loading }) {
  return (
    <Container isLoading={loading}>
      <div>
        <img src={loader} alt="loading" />
      </div>
    </Container>
  );
}

LoadingScreen.propTypes = {
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  loading: state.loading,
});

export default connect(mapStateToProps)(LoadingScreen);
