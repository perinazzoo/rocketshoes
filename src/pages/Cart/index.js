/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
  MdRemoveShoppingCart,
} from 'react-icons/md';

import {
  removeFromCart,
  updateAmountRequest,
} from '../../store/modules/cart/actions';
import { formatPrice } from '../../util/format';

import { Container, ProductTable, Total, EmptyCart } from './styles';

export default function Cart() {
  const cartAmount = useSelector(({ cart }) => cart.length);
  const cartState = useSelector(({ cart }) =>
    cart.map(product => ({
      ...product,
      subTotal: formatPrice(product.price * product.amount),
    }))
  );
  const total = useSelector(({ cart }) =>
    formatPrice(
      cart.reduce((t, product) => {
        return t + product.price * product.amount;
      }, 0)
    )
  );

  const dispatch = useDispatch();

  function increment(product) {
    dispatch(updateAmountRequest(product.id, product.amount + 1));
  }

  function decrement(product) {
    dispatch(updateAmountRequest(product.id, product.amount - 1));
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
              {cartState.map(product => (
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
                      onClick={() => dispatch(removeFromCart(product.id))}
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
