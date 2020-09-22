import React, { useState } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import { createStructuredSelector } from 'reselect'
import { selectCurrentUser } from '../../redux/user/user.selector'
import UserService from '../../services/user.service'
import { setCurrentUser } from '../../redux/user/user.actions'
import './password-settings.style.scss'

function PasswordSettings({ currentUser, setCurrentUser }) {
	const [input, setInput] = useState({ password0: '', password1: '', password2: '' })
	const [valid, setValid] = useState({ password0: false, password1: false, password2: false })
	const REGEX_PASSWORD = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g

	const blurHandler = (e) => {
		const setError = (msg) => {
			e.target.parentElement.setAttribute('error', msg)
			e.target.parentElement.classList.add('--error')
		}
		const clearError = () => {
			e.target.parentElement.setAttribute('error', '')
			e.target.parentElement.classList.remove('--error')
		}

		switch (e.target.id) {
			case 'current_password':
				if (input.password0) {
					if (currentUser.password === input.password0) {
						setValid({ ...valid, password0: true })
						clearError()
					} else {
						setValid({ ...valid, password0: false })
						setError('Incorrect password, Try another!')
					}
				} else {
					clearError()
					setValid({ ...valid, password0: false })
				}
				break
			case 'new_password':
				if (input.password1) {
					if (input.password1.match(REGEX_PASSWORD)) {
						setValid({ ...valid, password1: true })
						clearError()
					} else {
						setValid({ ...valid, password1: false })
						setError('Invalid password!')
					}
				} else {
					clearError()
					setValid({ ...valid, password1: false })
				}
				break
			case 'confirm_password':
				if (input.password2) {
					if (input.password2 === input.password1) {
						setValid({ ...valid, password2: true })
						clearError()
					} else {
						setValid({ ...valid, password2: false })
						setError('Passwords do not match, type again!')
					}
				} else {
					clearError()
					setValid({ ...valid, password2: false })
				}
				break
			default:
				break
		}
	}

	const submitHandler = (e) => {
		e.preventDefault()
		const msg = document.querySelector('#pwd-se-msg')
		const btn = document.querySelector('.password-change-submit')

		const setProgress = () => {
			document.body.style.pointerEvents = 'none'
			btn.classList.add('processing')
		}
		const clearProgress = () => {
			document.body.style.pointerEvents = ''
			btn.classList.remove('processing')
		}
		setProgress()

		if (valid.password0 && valid.password1 && valid.password2) {
			UserService.updateUser(currentUser.email, { ...currentUser, password: input.password2 })
				.then((res) => {
					setCurrentUser({ ...res.data })
					setInput({ password0: '', password1: '', password2: '' })
					msg.textContent = 'Password updated successfully!'
					msg.style.color = '#43a047'
				})
				.finally(() => clearProgress())
		} else {
			msg.textContent = 'Please valid all the fields!'
			msg.style.color = '#f44336'
			clearProgress()
		}
	}

	return (
		<div className='password-settings'>
			<div className='password-settings__header'>
				<p className='password-settings__header--title'>Change Your Password</p>
				<p className='password-settings__header--info'>Enter your old password and new one to change it.</p>
				<p className='password-settings__header--msg' id='pwd-se-msg'></p>
			</div>
			<form className='password-settings__form' id='pwd-se-form' onSubmit={(e) => submitHandler(e)}>
				<div className='password-settings__form__input-box'>
					<label>Current Password</label>
					<input
						type='password'
						name='password0'
						id='current_password'
						value={input.password0}
						onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
						onBlur={(e) => blurHandler(e)}
						autoComplete='no'
					/>
				</div>
				<div className='password-settings__form__input-box'>
					<label>New Password</label>
					<input
						type='password'
						name='password1'
						id='new_password'
						value={input.password1}
						onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
						onBlur={(e) => blurHandler(e)}
						autoComplete='no'
					/>
					<span id='password-req'>(Use 8 or more characters including letters numbers and symbols)</span>
				</div>
				<div className='password-settings__form__input-box'>
					<label>Confirm Password</label>
					<input
						type='password'
						name='password2'
						id='confirm_password'
						value={input.password2}
						onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
						onBlur={(e) => blurHandler(e)}
						autoComplete='no'
					/>
				</div>
				<div className='password-settings__form--submit'>
					<button type='submit' className='password-change-submit --action-button' value='Change Password'>
						<FontAwesomeIcon icon={faSpinner} />
					</button>
				</div>
				<p className='password-settings--ending'>⤴</p>
			</form>
		</div>
	)
}

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
})

const mapDispatchToProps = (dispatch) => ({
	setCurrentUser: (user) => dispatch(setCurrentUser(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PasswordSettings)
