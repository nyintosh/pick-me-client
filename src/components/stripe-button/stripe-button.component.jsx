import React from 'react'
import { Link } from 'react-router-dom'
import StripeCheckout from 'react-stripe-checkout'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import { selectCurrentUser } from '../../redux/user/user.selector'
import { clearCart } from '../../redux/cart/cart.actions'

import LOGO from '../../assets/images/LOGO.png'

function StripeCheckoutButton({ price, currentUser, clearCart }) {
	const priceForStripe = price * 100,
		publishableKey = 'pk_test_51HT6SCGIbHJPGQus8EDeRmOfqKsG1CJqCR7SnYJwr0n4ARmlBe1PjaZM142DTmhiUTJw4JXgWTlYkuPKLUtHC01d00qbDnaHvz'

	const onToken = (token) => {
		clearCart()
		alert('Payment successful!')
		setTimeout(() => (window.location.href = '/'), 2000)
	}

	return (
		<>
			{currentUser ? (
				<StripeCheckout
					label='Pay Now'
					name='Pick Me'
					description={`Your total is $${price.toFixed(2)}`}
					amount={priceForStripe}
					image={LOGO}
					panelLabel='Pay Now'
					token={onToken}
					stripeKey={publishableKey}
					allowRememberMe={false}
				/>
			) : (
				<Link to='/auth/login' className='--action-button'>
					Login To Continue
				</Link>
			)}
		</>
	)
}

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
})

const mapDispatchToProps = (dispatch) => ({
	clearCart: () => dispatch(clearCart()),
})

export default connect(mapStateToProps, mapDispatchToProps)(StripeCheckoutButton)
