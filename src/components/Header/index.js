import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { MdShoppingCart } from 'react-icons/md';

import { Container, Cart } from './styles';

import logo from '../../assets/images/logo.svg';

function Header({ cartAmount }) {
  let item = '';

  switch (cartAmount) {
    case 0:
      item = 'Vazio';
      break;
    case 1:
      item = 'item';
      break;
    default:
      item = 'itens';
      break;
  }

  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="rocketshoes" />
      </Link>

      <Cart to="/cart">
        <div>
          <strong>Meu carrinho</strong>
          <span>
            {cartAmount > 0 ? cartAmount : ''} {item}
          </span>
        </div>
        <MdShoppingCart size={36} color="#fff" />
      </Cart>
    </Container>
  );
}

Header.propTypes = {
  cartAmount: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  cartAmount: state.cart.length,
});

export default connect(mapStateToProps)(Header);
