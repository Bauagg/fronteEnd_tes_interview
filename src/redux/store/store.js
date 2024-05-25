import { combineReducers, createStore } from "redux";
import productReducer from '../reducer/reducer'


const storeGlobal = combineReducers({ productDate: productReducer })

const storeRedux = createStore(storeGlobal)

export default storeRedux