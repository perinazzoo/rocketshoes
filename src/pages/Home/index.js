import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { MdAddShoppingCart } from 'react-icons/md';

import { formatPrice } from '../../util/format';
import { addToCartRequest } from '../../store/modules/cart/actions';
import { loadingStatus } from '../../store/modules/loading/actions';
import api from '../../services/api';

import { ProductList } from './styles';

export default function Home() {
  const [products, setProducts] = useState([]);
  const amount = useSelector(({ cart }) =>
    cart.reduce((a, product) => {
      a[product.id] = product.amount;

      return a;
    }, {})
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadingStatus(true));
    async function loadProducts() {
      const response = await api.get('/products');

      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));
      setProducts(data);
      dispatch(loadingStatus(false));
    }
    loadProducts();
  }, [dispatch]);

  const handleAddProduct = id => {
    dispatch(addToCartRequest(id));
  };

  return (
    <ProductList>
      {products.map(product => (
        <li key={product.id}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>

          <span>{product.priceFormatted}</span>

          <button type="button" onClick={() => handleAddProduct(product.id)}>
            <div>
              <MdAddShoppingCart size={16} color="fff" />
              {amount[product.id] || 0}
            </div>

            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
}
