import cartActionTypes from './cart.types'

export const addItem = (item) => ({
		type: cartActionTypes.ADD_ITEM,
		payload: item,
	}),
	reduceItem = (item) => ({
		type: cartActionTypes.REDUCE_ITEM,
		payload: item,
	}),
	removeItem = (item) => ({
		type: cartActionTypes.REMOVE_ITEM,
		payload: item,
	}),
	clearCart = () => ({
		type: cartActionTypes.CLEAR_CART,
	})
