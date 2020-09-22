import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import { addItem, reduceItem, removeItem } from '../../redux/cart/cart.actions'

import './checkout-item.style.scss'

function CheckoutItem({ cartItem, removeItem, addItem, reduceItem }) {
	const { image1, label, quantity, price, type, userId, id } = cartItem

	return (
		<div className='checkout-item'>
			<Link to={`/preview/${id}-${type}-${userId}-${label}`} className='checkout-item--image'>
				<div>
					<img src={`data:image/png;base64,${image1}`} alt='preview' />
				</div>
			</Link>
			<span className='checkout-item--label'>{label}</span>
			<span className='checkout-item--quantity'>
				<div className='arrow' onClick={() => reduceItem(cartItem)}>
					<FontAwesomeIcon icon={faChevronLeft} />
				</div>
				<span className='value'>{quantity}</span>
				<div className='arrow' onClick={() => addItem(cartItem)}>
					<FontAwesomeIcon icon={faChevronRight} />
				</div>
			</span>
			<span className='checkout-item--price'>{price === 0 ? 'FREE' : `$${price}`}</span>
			<div className='checkout-item--remove' onClick={() => removeItem(cartItem)}>
				<FontAwesomeIcon icon={faTrashAlt} />
			</div>
		</div>
	)
}

const mapDispatchToProps = (dispatch) => ({
	removeItem: (item) => dispatch(removeItem(item)),
	addItem: (item) => dispatch(addItem(item)),
	reduceItem: (item) => dispatch(reduceItem(item)),
})

export default connect(null, mapDispatchToProps)(CheckoutItem)
