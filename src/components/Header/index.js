import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { MdShoppingCart } from 'react-icons/md';

import { Container, Cart } from './styles';

import logo from '../../assets/images/logo.svg';

export default function Header() {
  const cartAmount = useSelector(({ cart }) => cart.length);

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
