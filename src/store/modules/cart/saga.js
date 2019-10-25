import { call, put, select, all, takeLatest} from 'redux-saga/effects';

import api from '../../../services/api';
import history from '../../../services/history';
import { toast } from 'react-toastify';

import { addCartSuccess, updateAmountSuccess, updateAmountRequest } from './actions';
import { formatPrice } from '../../../util/format';


function* addToCart({id}) {
    //sempre utilizar o yield quando disparar uma action do redux-saga
    const productExist = yield select(
        state => state.cart.find(p => p.id === id),
    )

    const stock = yield call(api.get, `/stock/${id}`);
    const amountStock = stock.data.amount;
    const currentAmount = productExist ? productExist.amount : 0;

    const amount = currentAmount + 1;

    if (amount > amountStock) {
        console.tron.warn('ERROR');
        toast.error('Quantidade solicitada fora de estoque!');
        return;
    }

    if (productExist) {

        yield put(updateAmountSuccess(id, amount));

    }else{
        const response = yield call(api.get, `/products/${id}`);

        const data = {
            ...response.data,
            amount: 1,
            priceFormatted: formatPrice(response.data.price),
        }

        yield put(addCartSuccess(data))

        history.push('/cart');
    }
}

function* updateAmount({id, amount}) {
    if (amount <= 0){
        return
    }

    const stock = yield call(api.get, `/stock/${id}`);
    const amountStock = stock.data.amount;

    if(amount > amountStock) {
        toast.error('Quantidade solicitada fora de estoque!');
        return;
    }

    yield put(updateAmountSuccess(id, amount));
}

export default all([
    takeLatest('@cart/ADD_REQUEST', addToCart),
    takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
