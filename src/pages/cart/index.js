import React from 'react';
import {MdAddCircleOutline, MdRemoveCircleOutline, MdDelete} from 'react-icons/md';
import { Container, TableProductList, Total } from './styles';
import { connect } from 'react-redux';

function Cart({ cart }) {
  return (
    <Container>
      <TableProductList>
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

              <tr>
              <td>
                <img src={product.image} alt="tenis" />
              </td>
              <td>
                <strong>{product.title}</strong>
                <span>{product.priceFormated}</span>
              </td>
              <td>
                <div>
                  <button type="button" >
                    <MdRemoveCircleOutline size={20} color="#7159c1" />
                  </button>
                  <input type="number" readOnly value={product.amount} />
                  <button type="button">
                    <MdAddCircleOutline size={20} color="#7159c1" />
                  </button>
                </div>
              </td>
              <td>
                <strong>R$258,00</strong>
              </td>
              <td>
                <button>
                  <MdDelete size={20} color="#7159c1" />
                </button>
              </td>
            </tr>
            ))}
        </tbody>
      </TableProductList>

        <footer>
          <button type="button">Finalizar Pedido</button>

          <Total>
            <span>TOTAL</span>
            <strong>R$1988,00</strong>
          </Total>
        </footer>
    </Container>
  );
}

const mapStateToProps = state => ({
  cart: state.cart,
});

export default connect(mapStateToProps)(Cart);
