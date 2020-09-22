import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faUserCircle } from '@fortawesome/free-solid-svg-icons'

import { selectCurrentUser } from '../../redux/user/user.selector'
import { selectCartCount } from '../../redux/cart/cart.selector'

import LOGO from '../../assets/LOGO'
import DEFAULT_USER_IMAGE from '../../assets/images/default-user-image.png'
import './header.style.scss'

function Header({ currentUser, cartItemCount }) {
	window.onscroll = () => {
		const header = document.querySelector('#header')
		window.pageYOffset > 20 ? (header.style.height = '50px') : (header.style.height = '')
	}

	return (
		<div className='header' id='header'>
			<div className='header__container'>
				<Link to='/' className='header__container--logo'>
					<LOGO />
					<span id='title'>Pick Me</span>
				</Link>
				<div className='header__container--nav'>
					<Link to='/browse/webdesign' content='web designs'>
						<span>Web Designs</span>
					</Link>
					<Link to='/browse/card' content='cards'>
						<span>Cards</span>
					</Link>
					<Link to='/browse/icon' content='icons'>
						<span>Icons</span>
					</Link>
				</div>
				<div className='header__container__action'>
					{currentUser && (
						<Link to='/add/webdesign' className='header__container__action--console' content='Add Project . . .'>
							<span>Add Project . . .</span>
						</Link>
					)}
					<Link to='/checkout' className='header__container__action--cart'>
						<FontAwesomeIcon icon={faShoppingCart} />
						{cartItemCount > 0 && <span id='cart-item-count'>{cartItemCount}</span>}
					</Link>
					<div className='header__container__action--account'>
						{currentUser ? (
							<Link to={`/user/${currentUser.username}`} id='authorized'>
								<img
									alt='user-profile'
									src={
										currentUser.profile.image
											? `data:image/png;base64,${currentUser.profile.image}`
											: DEFAULT_USER_IMAGE
									}
								/>
							</Link>
						) : (
							<Link to='/auth/login' id='unauthorized'>
								<FontAwesomeIcon icon={faUserCircle} />
								<span>Account</span>
							</Link>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	cartItemCount: selectCartCount,
})

export default connect(mapStateToProps)(Header)
