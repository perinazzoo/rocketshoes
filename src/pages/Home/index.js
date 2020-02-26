import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { MdAddShoppingCart } from 'react-icons/md';

import { formatPrice } from '../../util/format';
import * as CartActions from '../../store/modules/cart/actions';
import * as LoadingActions from '../../store/modules/loading/actions';
import api from '../../services/api';

import { ProductList } from './styles';

class Home extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    products: [],
  };

  async componentDidMount() {
    const { loadingActions } = this.props;
    const { loadingStatus } = loadingActions;
    loadingStatus(true);

    const response = await api.get('/products');

    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));

    this.setState({ products: data });
    loadingStatus(false);
  }

  handleAddProduct = id => {
    const { cartActions } = this.props;
    const { addToCartRequest } = cartActions;

    addToCartRequest(id);
  };

  render() {
    const { products } = this.state;
    const { amount } = this.props;

    return (
      <ProductList>
        {products.map(product => (
          <li key={product.id}>
            <img src={product.image} alt={product.title} />
            <strong>{product.title}</strong>

            <span>{product.priceFormatted}</span>

            <button
              type="button"
              onClick={() => this.handleAddProduct(product.id)}
            >
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
}

Home.propTypes = {
  cartActions: PropTypes.shape({
    addToCartRequest: PropTypes.func,
  }).isRequired,
  amount: PropTypes.objectOf(PropTypes.number).isRequired,
  loadingActions: PropTypes.shape({
    loadingStatus: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;

    return amount;
  }, {}),
});

const mapDispatchToProps = dispatch => ({
  cartActions: bindActionCreators(CartActions, dispatch),
  loadingActions: bindActionCreators(LoadingActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
