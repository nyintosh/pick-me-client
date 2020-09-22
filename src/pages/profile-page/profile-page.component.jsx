import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faSignOutAlt, faUserCog, faLink } from '@fortawesome/free-solid-svg-icons'

import { removeCurrentUser } from '../../redux/user/user.actions'
import { selectCurrentUser } from '../../redux/user/user.selector'
import UserService from '../../services/user.service'

import PreLoader from '../../components/pre-loader/pre-loader.component'
import ProfileProject from '../../components/profile-projects/profile-projects.component'
import ProfileUpdate from '../../components/profile-update/profile-update.component'
import DEFAULT_USER_IMAGE from '../../assets/images/default-user-image.png'
import './profile-page.style.scss'

function ProfilePage({ currentUser, removeCurrentUser }) {
	const { userId } = useParams()
	const [currentProfile, setCurrentProfile] = useState({ id: '', username: '', email: '', nickname: '', image: '', bio: '', webUrl: '' })
	const [edit, setEdit] = useState(false)
	const [isLoaded, setIsLoaded] = useState(false)

	const pathname = window.location.pathname.split('/'),
		hint = pathname[pathname.length - 1]
	const [projectType, setProjectType] = useState('webdesign')

	useEffect(() => {
		setIsLoaded(false)
		if (hint !== 'webdesign' && hint !== 'card' && hint !== 'icon') window.location.href = `/user/${userId}/webdesign`
		else setProjectType(hint)

		UserService.getUserByUsername(userId)
			.then((res) => {
				if (res.data) {
					const { id, username, email } = res.data,
						{ nickname, image, bio, webUrl } = res.data.profile

					setCurrentProfile({
						id: id,
						username: username,
						email: email,
						nickname: nickname,
						image: image,
						bio: bio,
						webUrl: webUrl,
					})
				} else window.history.back()
			})
			.finally(() => {
				setTimeout(() => setIsLoaded(true), 400)
			})
	}, [hint, userId])

	const subLinkHandler = (e) => {
		const links = document.querySelectorAll('.sub-header-link')
		links.forEach((el) => el.classList.remove('active'))
		e.target.classList.add('active')
	}

	const logoutHandler = () => window.confirm('Are you sure want to logout?') && removeCurrentUser()

	const { id, username, email, nickname, image, bio, webUrl } = currentProfile

	return (
		<div className='profile-page'>
			{isLoaded ? (
				<>
					{currentUser && <ProfileUpdate status={edit} setStatus={setEdit} />}
					<div className='profile-page__header'>
						<div className='profile-page__header__container'>
							<ul className='profile-page__header__container--nav'>
								<Link
									to={`/user/${username}/webdesign`}
									className={`sub-header-link ${(hint === userId || !hint || hint === 'webdesign') && 'active'}`}
									id='webdesign'
									onClick={(e) => subLinkHandler(e)}
									content='web designs'
								>
									<span>Web Designs</span>
								</Link>
								<Link
									to={`/user/${username}/card`}
									className={`sub-header-link ${hint === 'card' && 'active'}`}
									id='cards'
									onClick={(e) => subLinkHandler(e)}
									content='cards'
								>
									<span>Cards</span>
								</Link>
								<Link
									to={`/user/${username}/icon`}
									className={`sub-header-link ${hint === 'icon' && 'active'}`}
									id='icons'
									onClick={(e) => subLinkHandler(e)}
									content='icons'
								>
									<span>Icons</span>
								</Link>
							</ul>
						</div>
					</div>
					<div className='profile-page__container'>
						<div className='profile-page__container__profile'>
							<img
								src={image ? `data:image/png;base64,${image}` : DEFAULT_USER_IMAGE}
								alt='user'
								className='profile-page__container__profile--image'
							/>
							<div className='profile-page__container__profile__data'>
								<p className='profile-page__container__profile__data--nickname'>{nickname || username}</p>
								<p className='profile-page__container__profile__data--username'>@{username}</p>
								<p className='profile-page__container__profile__data--bio'>{bio}</p>

								{currentUser && currentUser.username === userId && (
									<button className='profile-page__container__profile__data--edit' onClick={() => setEdit(!edit)}>
										<FontAwesomeIcon icon={faEdit} className='profile-icon' /> Edit Profile
									</button>
								)}

								<p className='profile-page__container__profile__data--email'>
									<FontAwesomeIcon icon={faEnvelope} className='profile-icon' /> {email}
								</p>
								<a
									rel='noopener noreferrer'
									href={webUrl}
									target='_blank'
									className='profile-page__container__profile__data--webUrl'
								>
									<FontAwesomeIcon icon={faLink} className={`profile-icon ${!webUrl && 'hide'}`} />{' '}
									{webUrl && webUrl.split('//')[1]}
								</a>

								{currentUser && currentUser.username === userId && (
									<div className='profile-page__container__profile__data__action'>
										<button className='profile-page__container__profile__data__action--signout' onClick={logoutHandler}>
											<FontAwesomeIcon icon={faSignOutAlt} />
										</button>
										<Link to='/settings/account' className='profile-page__container__profile__data__action--settings'>
											<FontAwesomeIcon icon={faUserCog} /> Account
										</Link>
									</div>
								)}

								<p className='profile-page__container__profile__data--ending'>⤴</p>
							</div>
						</div>

						<div className='profile-page__container__posts'>
							<ProfileProject uid={id} type={projectType} />
							<div className='profile-page__container__posts--ending'>&#x2934;</div>
						</div>
					</div>
				</>
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
	removeCurrentUser: () => dispatch(removeCurrentUser()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
