/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
  MdRemoveShoppingCart,
} from 'react-icons/md';

import * as CartActions from '../../store/modules/cart/actions';
import { formatPrice } from '../../util/format';

import { Container, ProductTable, Total, EmptyCart } from './styles';

function Cart({
  cart,
  removeFromCart,
  updateAmountRequest,
  total,
  cartAmount,
}) {
  function increment(product) {
    updateAmountRequest(product.id, product.amount + 1);
  }

  function decrement(product) {
    updateAmountRequest(product.id, product.amount - 1);
  }

  return (
    <Container>
      {cartAmount > 0 ? (
        <>
          <ProductTable>
            <thead>
              <tr>
                <th />
                <th>PRODUTO</th>
                <th>QTD</th>
                <th>SUBTOTAL</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {cart.map(product => (
                <tr key={product.id}>
                  <td>
                    <img src={product.image} alt={product.title} />
                  </td>
                  <td>
                    <strong>{product.title}</strong>
                    <span>{product.priceFormatted}</span>
                  </td>
                  <td>
                    <div>
                      <button type="button" onClick={() => decrement(product)}>
                        <MdRemoveCircleOutline size={20} color="#27ae60" />
                      </button>
                      <input type="number" readOnly value={product.amount} />
                      <button type="button" onClick={() => increment(product)}>
                        <MdAddCircleOutline size={20} color="#27ae60" />
                      </button>
                    </div>
                  </td>
                  <td>
                    <strong>{product.subTotal}</strong>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => removeFromCart(product.id)}
                    >
                      <MdDelete size={20} color="#27ae60" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </ProductTable>
          <footer>
            <button type="button">Finalizar pedido</button>

            <Total>
              <span>TOTAL</span>
              <strong>{total}</strong>
            </Total>
          </footer>
        </>
      ) : (
          <EmptyCart>
            <h1>Seu carrinho está vazio :(</h1>
            <MdRemoveShoppingCart color="#ddd" size={100} />
          </EmptyCart>
        )}
    </Container>
  );
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      image: PropTypes.string,
      priceFormatted: PropTypes.string,
      amount: PropTypes.number,
    })
  ).isRequired,
  total: PropTypes.string.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  updateAmountRequest: PropTypes.func.isRequired,
  cartAmount: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  cart: state.cart.map(product => ({
    ...product,
    subTotal: formatPrice(product.price * product.amount),
  })),
  total: formatPrice(
    state.cart.reduce((total, product) => {
      return total + product.price * product.amount;
    }, 0)
  ),
  cartAmount: state.cart.length,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
