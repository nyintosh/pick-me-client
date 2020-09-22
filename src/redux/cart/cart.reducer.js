import { AddItemsToCart, ReduceItemFromCart } from './cart.utils'
import cartActionTypes from './cart.types'

const INITIAL_STATE = {
	cartItems: [],
}

const cartReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case cartActionTypes.ADD_ITEM:
			return {
				cartItems: AddItemsToCart(state.cartItems, action.payload),
			}
		case cartActionTypes.REDUCE_ITEM:
			return {
				cartItems: ReduceItemFromCart(state.cartItems, action.payload),
			}
		case cartActionTypes.REMOVE_ITEM:
			return {
				cartItems: state.cartItems.filter((item) => action.payload.id !== item.id),
			}
		case cartActionTypes.CLEAR_CART:
			return {
				cartItems: [],
			}
		default:
			return state
	}
}
export default cartReducer
