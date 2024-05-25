export const product = (productAll) => {
    return {
        type: 'PRODUCT_ALL',
        payload: {
            productAll
        }
    }
}

export const toggleUpdateProduct = () => {
    return {
        type: 'TOGGLE_UPDATE_PRODUCT',
    };
};

export const payloadIdProduct = (idProduct) => {
    return {
        type: 'ID_PRODUCT',
        payload: {
            idProduct
        }
    }
}