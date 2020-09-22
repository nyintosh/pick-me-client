import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons'

import UserService from '../../services/user.service'
import { setCurrentUser } from '../../redux/user/user.actions'
import { selectCurrentUser } from '../../redux/user/user.selector'

import PLACEHOLDER from '../../assets/images/ICON_PLACEHOLDER.jpg'
import './profile-update.style.scss'

function ProfileUpdate({ status, setStatus, currentUser, setCurrentUser }) {
	const { nickname, image, bio, webUrl } = currentUser.profile
	const [input, setInput] = useState({ nickname: nickname || '', image: image || '', bio: bio || '', webUrl: webUrl || '' })

	const imageInputHandler = (e) => {
		try {
			const previews = document.querySelectorAll('.image-preview')
			const reader = new FileReader()
			const file = e.target.files[0]

			reader.onload = () => {
				previews.forEach((el) => (el.src = reader.result))
				setInput({ ...input, image: reader.result.split(',')[1] })
			}
			reader.readAsDataURL(file)
		} catch (err) {
			// console.log(err)
		}
	}

	const updateHandler = (e) => {
		e.preventDefault()
		const btn = document.querySelector('.profile-update-submit')

		const setProgress = () => {
			document.body.style.pointerEvents = 'none'
			btn.classList.add('processing')
		}
		const clearProgress = () => {
			document.body.style.pointerEvents = ''
			btn.classList.remove('processing')
		}
		setProgress()

		UserService.updateUser(currentUser.email, { ...currentUser, profile: { ...currentUser.profile, ...input } })
			.then((res) => {
				setCurrentUser({ ...res.data })
				window.location.reload()
			})
			.finally(() => clearProgress())
	}

	return (
		<div className={`profile-update ${!status && 'close'}`}>
			<div className='profile-update__container'>
				<div className='profile-update__container--header'>
					<FontAwesomeIcon icon={faTimes} onClick={() => setStatus(!status)} />
					<p>Edit Profile</p>
				</div>
				<form className='profile-update__container__form' onSubmit={(e) => updateHandler(e)}>
					<div className='profile-update__container__form__input-box'>
						<label>Profile Picture:</label>
						<div className='profile-update__container__form__input-box__content'>
							<div className='profile-update__container__form__input-box__content--image'>
								<img
									src={input.image ? `data:image/png;base64,${input.image}` : PLACEHOLDER}
									alt='user'
									className='image-preview'
									onClick={() => document.getElementById('file').click()}
								/>
								<label>Edit</label>
								<input type='file' name='file' id='file' onChange={(e) => imageInputHandler(e)} />
							</div>
							<div className='profile-update__container__form__input-box__content--image'>
								<img
									src={input.image ? `data:image/png;base64,${input.image}` : PLACEHOLDER}
									alt='user'
									className='image-preview'
								/>
							</div>
							<div className='profile-update__container__form__input-box__content--image'>
								<img
									src={input.image ? `data:image/png;base64,${input.image}` : PLACEHOLDER}
									alt='user'
									className='image-preview'
								/>
							</div>
						</div>
					</div>

					<div className='profile-update__container__form__input-box'>
						<label>Nickname:</label>
						<input
							type='text'
							name='nickname'
							id='nickname'
							value={input.nickname}
							onChange={(e) => setInput({ ...input, nickname: e.target.value })}
						/>
					</div>
					<div className='profile-update__container__form__input-box'>
						<label>Bio:</label>
						<input
							type='text'
							name='bio'
							id='bio'
							value={input.bio}
							onChange={(e) => setInput({ ...input, bio: e.target.value })}
						/>
					</div>
					<div className='profile-update__container__form__input-box'>
						<label>WebUrl:</label>
						<input
							type='text'
							name='webUrl'
							id='webUrl'
							value={input.webUrl}
							onChange={(e) => setInput({ ...input, webUrl: e.target.value })}
						/>
					</div>

					<div className='profile-update__container__form--action'>
						<button type='button' className='--action-button' onClick={() => setStatus(!status)}>
							Close
						</button>
						<button type='submit' className='profile-update-submit --action-button' value='Update'>
							<FontAwesomeIcon icon={faSpinner} />
						</button>
					</div>
				</form>
				<p>⤴</p>
			</div>
		</div>
	)
}

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
})

const setDispatchToProps = (dispatch) => ({
	setCurrentUser: (profile) => dispatch(setCurrentUser(profile)),
})

export default connect(mapStateToProps, setDispatchToProps)(ProfileUpdate)
