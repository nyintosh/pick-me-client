import { createSelector } from 'reselect'

const selectCart = (state) => state.cart

export const selectCartItems = createSelector([selectCart], (cart) => cart.cartItems)

export const selectCartCount = createSelector([selectCartItems], (items) => {
	return items.reduce((acc, item) => acc + item.quantity, 0)
})

export const selectCartItemsTotal = createSelector([selectCartItems], (items) => {
	return items.reduce((acc, item) => acc + item.quantity * item.price, 0)
})
