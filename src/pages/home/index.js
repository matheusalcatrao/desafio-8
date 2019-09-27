import React, { Component } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import {connect} from 'react-redux';
import { ProductList } from './styles';

import * as CartActions from '../../store/modules/cart/actions';
import Api from '../../services/api';
import {formatPrice} from '../../util/format';

class Home extends Component {

  state = {
    products: [],
  }

  async componentDidMount() {
    const response = await Api.get('products');

    const data = response.data.map(product => ({
      ...product,
      priceFormated: formatPrice(product.price)
    }));

    this.setState({products: data});
  }

  handleAddProduct = product => {
    const {dispatch} = this.props;
    dispatch(CartActions.addCart(product));
  }


  render() {
    const { products } = this.state;

    return (
      <ProductList>
      {products.map(product => (
        <li key={product.id}>
          <img src={product.image}
               alt={product.title} />
          <strong>{product.title}</strong>
          <span>{product.priceFormated}</span>

          <button type="button" onClick={() => this.handleAddProduct(product)}>
            <div>
              <MdAddShoppingCart size={16} color="#FFF" /> 3
            </div>

            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
      </ProductList>
    );
  }

}

export default connect()(Home);
