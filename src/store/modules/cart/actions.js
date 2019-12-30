export function addCartRequest(id) {
    return {
        type: '@cart/ADD_REQUEST',
        id
    };
}

export function addCartSuccess(product) {
    return {
        type: '@cart/ADD_SUCCESS',
        product
    };
}

export function removeCart(id) {
    return {
        type: '@cart/REMOVE',
        id: id,
    };
}

export function updateAmountRequest(id, amount) {
    return {
        type: '@cart/UPDATE_AMOUNT_REQUEST',
        id,
        amount,
    }
}

export function updateAmountSuccess(id, amount) {
    return {
        type: '@cart/UPDATE_AMOUNT_SUCCESS',
        id,
        amount,
    }
}