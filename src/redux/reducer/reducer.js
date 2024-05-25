const stateGlobal = {
    productAll: [],
    toggleupdateProduct: false,
    idProduct: null
}

const reducerStateGlobal = (state = stateGlobal, action) => {
    switch (action.type) {
        case 'PRODUCT_ALL':
            return {
                ...state,
                productAll: action.payload.productAll,

            }
        case 'TOGGLE_UPDATE_PRODUCT':
            return {
                ...state,
                toggleupdateProduct: !state.toggleupdateProduct,
            }
        case 'ID_PRODUCT':
            return {
                ...state,
                idProduct: action.payload.idProduct
            }
        default:
            return state
    }
}

export default reducerStateGlobal