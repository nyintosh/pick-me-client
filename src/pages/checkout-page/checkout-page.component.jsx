import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { selectCartCount, selectCartItems, selectCartItemsTotal } from '../../redux/cart/cart.selector'

import CheckoutItem from '../../components/checkout-item/checkout-item.component'
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component'
import './checkout-page.style.scss'

function CheckoutPage({ cartItems, cartItemsCount, totalPrice }) {
	return (
		<div className='checkout-page'>
			<div className='checkout-page__container'>
				<div className='checkout-page__header'>
					<div className='checkout-page__header--block'>Product</div>
					<div className='checkout-page__header--block'>Label</div>
					<div className='checkout-page__header--block'>Quantity</div>
					<div className='checkout-page__header--block'>Price</div>
					<div className='checkout-page__header--block'></div>
				</div>

				{cartItems.map((item) => (
					<CheckoutItem key={item.id} cartItem={item} />
				))}

				{cartItemsCount > 0 ? (
					<div className='checkout-page__checkout'>
						<div>
							<span>Total:</span>
							<span>${totalPrice.toFixed(2)}</span>
						</div>
						<StripeCheckoutButton price={totalPrice} />
					</div>
				) : (
					<div className='checkout-page--empty'>
						<span>There is currently no items in cart...</span>
					</div>
				)}

				<div className='checkout-page--ending'>⤴</div>
			</div>
		</div>
	)
}

const mapStateToProps = createStructuredSelector({
	cartItems: selectCartItems,
	cartItemsCount: selectCartCount,
	totalPrice: selectCartItemsTotal,
})

export default connect(mapStateToProps)(CheckoutPage)
