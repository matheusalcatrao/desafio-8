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

export function updateAmount(id, amount) {
    return {
        type: '@cart/UPDATE_AMOUNT',
        id,
        amount,
    }
}
