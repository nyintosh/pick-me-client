import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'
import { faCartPlus, faCog } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

import UserService from '../../services/user.service'
import ProjectService from '../../services/project.service'
import { selectCurrentUser } from '../../redux/user/user.selector'
import { addItem } from '../../redux/cart/cart.actions'
import { Vote } from '../../utils/vote.utils'

import PreLoader from '../../components/pre-loader/pre-loader.component'
import ItemCard from '../../components/item-card/item-card.components'
import DEFAULT_USER_LOG from '../../assets/images/default-user-image.png'
import './preview-page.style.scss'

function PreviewPage({ currentUser, addItemToCart }) {
	const { pathId } = useParams()
	const [pid, type, uid] = pathId.split('-')

	const [project, setProject] = useState({})
	const [projectList, setProjectList] = useState([])
	const [owner, setOwner] = useState({})

	const [isVoted, setIsVoted] = useState(false)
	const [votes, setVotes] = useState(0)

	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		setIsLoaded(false)
		axios
			.all([
				UserService.getUserById(uid),
				ProjectService.getById(pid),
				ProjectService.getUserVoteIdByPid(pid),
				ProjectService.getVoteCountByPid(pid),
				ProjectService.getAllByLimitOrderByRandom(type, 12, pid),
			])
			.then(
				axios.spread((res1, res2, res3, res4, res5) => {
					setOwner({ ...res1.data })
					setProject({ ...res2.data })
					res3.data.forEach((data) => currentUser && currentUser.id === data && setIsVoted(true))
					setVotes(res4.data)
					setProjectList(res5.data)
				})
			)
			.catch(() => {
				window.history.back()
			})
			.finally(() => {
				setTimeout(() => setIsLoaded(true), 400)
			})
	}, [pid, type, currentUser, uid])

	const remoteHandler = (e) => {
		document.querySelectorAll('.remote').forEach((el) => el.classList.remove('active'))
		e.target.classList.add('active')
		document.querySelector('#display').src = e.target.children[0].src
	}

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

	const { image1, image2, image3, label, price } = project
	const { username, profile } = owner

	return (
		<div className='preview-page'>
			{projectList.length !== 0 && isLoaded ? (
				<div className='preview-page__container'>
					<div className='preview-page__main'>
						<div className={`preview-page__main__preview ${type}`}>
							<div className='preview-page__main__preview--display'>
								{image1 && <img src={`data:image/jpg;base64,${image1}`} alt='display' id='display' />}
							</div>
							{type !== 'icon' && (
								<div className={`preview-page__main__preview--remote`}>
									{image1 && (
										<div className='remote active' onClick={(e) => remoteHandler(e)}>
											<img src={`data:image/jpg;base64,${image1}`} alt='display' />
										</div>
									)}
									{image2 && (
										<div className='remote' onClick={(e) => remoteHandler(e)}>
											<img src={`data:image/jpg;base64,${image2}`} alt='display' />
										</div>
									)}
									{image3 && (
										<div className='remote' onClick={(e) => remoteHandler(e)}>
											<img src={`data:image/jpg;base64,${image3}`} alt='display' />
										</div>
									)}
								</div>
							)}
						</div>
						<div className='preview-page__main__content'>
							<p className='preview-page__main__content--label'>{label}</p>
							<p className='preview-page__main__content--price'>{price <= 0 ? 'FREE' : `$${price}`}</p>
							{currentUser && currentUser.id === project.userId ? (
								<Link to={`/edit-project/${pid}`} className='--action-button'>
									Edit <FontAwesomeIcon icon={faCog} />
								</Link>
							) : (
								<button onClick={addToCartHandler} className='--action-button'>
									Add to cart <FontAwesomeIcon icon={faCartPlus} />
								</button>
							)}
							<p className='preview-page__main__content--vote' onClick={onVoteHandler}>
								<FontAwesomeIcon style={{ color: isVoted && '#f44336' }} icon={isVoted ? solidHeart : regularHeart} />{' '}
								{votes ? votes : '0'}
							</p>
							<div className='preview-page__main__content--devinfo'>
								<p>Created By:</p>
								<Link to={`/user/${username && username}`}>
									{profile && (
										<img
											src={profile.image ? `data:image/jpg;base64,${profile.image}` : DEFAULT_USER_LOG}
											alt='owner'
										/>
									)}
									<p>{currentUser && currentUser.id === project.userId ? 'YOU' : profile && profile.nickname}</p>
								</Link>
							</div>
						</div>
					</div>
					<hr />
					<div className='preview-page__related'>
						<p className='preview-page__related--title'>Related Projects</p>
						<div>
							{projectList.map((el, idx) => (
								<ItemCard key={idx} image={el.image1} pid={el.id} type={el.type} uid={el.userId} label={el.label} />
							))}
						</div>
						<p className='preview-page__related--ending'>&#x2934;</p>
					</div>
				</div>
			) : (
				<PreLoader />
			)}
		</div>
	)
}

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
})

const mapDispatchToProps = (dispatch) => ({
	addItemToCart: (item) => dispatch(addItem(item)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PreviewPage)
