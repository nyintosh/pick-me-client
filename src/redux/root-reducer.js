import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import userReducer from './user/user.reducer'
import cartReducer from './cart/cart.reducer'

const rootReducer = combineReducers({
	user: userReducer,
	cart: cartReducer,
})

const persistConfig = {
	key: 'root',
	storage,
	whiteList: [],
}

export default persistReducer(persistConfig, rootReducer)
