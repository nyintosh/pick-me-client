import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'
import { faCartPlus, faCog } from '@fortawesome/free-solid-svg-icons'

import { addItem } from '../../redux/cart/cart.actions'
import ProjectService from '../../services/project.service'
import { Vote } from '../../utils/vote.utils'

import { createStructuredSelector } from 'reselect'
import { selectCurrentUser } from '../../redux/user/user.selector'
import './item-card.style.scss'

function ItemCard({ image, pid, type, uid, label, currentUser, addItemToCart }) {
	const [isVoted, setIsVoted] = useState(false)
	const [votes, setVotes] = useState(0)

	useEffect(() => {
		ProjectService.getUserVoteIdByPid(pid).then((res) => {
			if (currentUser) {
				res.data.forEach((data) => currentUser.id === data && setIsVoted(true))
			}
		})
	}, [currentUser, pid])

	const onVoteHandler = () => {
		if (!currentUser) window.confirm(`Login to continue!`) && (window.location.href = '/auth/login')
		else Vote(isVoted, setIsVoted, currentUser.id, pid, votes, setVotes)
	}

	const addToCartHandler = () => {
		ProjectService.getById(pid).then((res) => {
			if (res.status === 200) {
				addItemToCart({ ...res.data, image2: null, image3: null })
				alert('Items added to cart!')
			} else alert('Error . . .')
		})
	}

	return (
		<div className={`item-card ${type}`}>
			<div className='item-card__container'>
				<div className='item-card__content'>
					<Link to={`/preview/${pid}-${type}-${uid}-${label}`}>
						<img src={`data:image/png;base64,${image}`} alt='preview' className='item-card__content--preview' />
					</Link>
					<button className='button' onClick={onVoteHandler}>
						<FontAwesomeIcon style={{ color: isVoted && '#f44336' }} icon={isVoted ? solidHeart : regularHeart} />
					</button>
					{currentUser && uid === currentUser.id ? (
						<Link to={`/edit-project/${pid}`} className='button'>
							<FontAwesomeIcon icon={faCog} />
						</Link>
					) : (
						<button className='button' onClick={addToCartHandler}>
							<FontAwesomeIcon icon={faCartPlus} />
						</button>
					)}
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
})

const mapDispatchToProps = (dispatch) => ({
	addItemToCart: (item) => dispatch(addItem(item)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ItemCard)
