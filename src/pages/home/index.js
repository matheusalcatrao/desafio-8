import React, { useState, useEffect,  } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { useDispatch, useSelector} from 'react-redux';
import { ProductList } from './styles';

import * as CartActions from '../../store/modules/cart/actions';
import Api from '../../services/api';
import {formatPrice} from '../../util/format';

export default function Home() {

    const [products, setProducts] = useState([]);
    const amount = useSelector(state =>
        state.cart.reduce(( sumAmount, product ) => {
        sumAmount[product.id] = product.amount;

        return sumAmount;
        }, {})
    );

    const dispatch = useDispatch();

    useEffect(() => {
        async function loadProducts() {
            const response = await Api.get('products');

            const data = response.data.map(product => ({
              ...product,
              priceFormated: formatPrice(product.price)
            }));

            setProducts(data);
        }

        loadProducts();
    },[]);

   function handleAddProduct (product) {
    dispatch(CartActions.addCartRequest(product.id));
  }


    return (
        <ProductList>
        {products.map(product => (
        <li key={product.id}>
            <img src={product.image}
                alt={product.title} />
            <strong>{product.title}</strong>
            <span>{product.priceFormated}</span>

            <button type="button" onClick={() => handleAddProduct(product)}>
            <div>
                <MdAddShoppingCart size={16} color="#FFF" />{amount[product.id] || 0}
            </div>

            <span>ADICIONAR AO CARRINHO</span>
            </button>
        </li>
        ))}
        </ProductList>
    );
}

