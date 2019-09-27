export function addCart(product) {
    return {
        type: '@cart/ADD',
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
