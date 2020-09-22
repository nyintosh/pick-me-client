import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faSpinner } from '@fortawesome/free-solid-svg-icons'

import { setCurrentUser } from '../../../redux/user/user.actions'
import UserService from '../../../services/user.service'

function LoginForm({ setCurrentUser }) {
	const [input, setInput] = useState({ email: '', password: '' })

	const loginHandler = (e) => {
		e.preventDefault()
		const error = document.querySelector('#--login-error')
		const btn = document.querySelector('.auth-form-submit')

		const setProgress = () => {
			document.body.style.pointerEvents = 'none'
			btn.classList.add('processing')
		}
		const clearProgress = () => {
			document.body.style.pointerEvents = ''
			btn.classList.remove('processing')
		}
		setProgress()

		if (input.email && input.password) {
			UserService.getUserByEmail(input.email)
				.then((res) => {
					if (res.status === 200) {
						if (res.data) {
							if (input.password === res.data.password) setCurrentUser({ ...res.data })
							else error.textContent = 'Incorrect email or password!'
						} else {
							error.textContent = `Email doesn't exist!`
						}
					}
				})
				.finally(() => clearProgress())
		} else {
			error.textContent = 'Invalid email or password'
			clearProgress()
		}
	}

	return (
		<div className='auth-form-container'>
			<div className='auth-form-container__title'>
				<p className='auth-form-container__title--header'>Pick Me</p>
				<p className='auth-form-container__title--label'>Enter your account to login</p>
				<p id='--login-error' className='--auth-error'></p>
			</div>
			<form className='auth-form-container__form' onSubmit={(e) => loginHandler(e)}>
				<div className='auth-form-container__form--input'>
					<div className='form-input'>
						<label className='form-input--label'>email</label>
						<div className='form-input__input-box'>
							<div className='form-input__input-box--icon'>
								<FontAwesomeIcon icon={faEnvelope} />
							</div>
							<input
								type='email'
								name='email'
								value={input.email}
								className='form-input__input-box--input'
								onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
								autoComplete='on'
							/>
						</div>
					</div>
				</div>
				<div className='auth-form-container__form--input'>
					<div className='form-input'>
						<label className='form-input--label'>password</label>
						<div className='form-input__input-box'>
							<div className='form-input__input-box--icon'>
								<FontAwesomeIcon icon={faLock} />
							</div>
							<input
								type='password'
								name='password'
								value={input.password}
								className='form-input__input-box--input'
								onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
								autoComplete='off'
							/>
						</div>
					</div>
					<p className='auth-form-container__form--input--help --link-blue-highlight'>
						<Link to='/auth/forgot'>Forgot Password?</Link>
					</p>
				</div>
				<button type='submit' className='auth-form-submit --action-button' value='Login'>
					<FontAwesomeIcon icon={faSpinner} />
				</button>
			</form>
			<hr />
			<p className='auth-form-container--help'>
				New to Pick Me?{' '}
				<Link to='/auth/register' className='--link-blue-highlight'>
					Register
				</Link>
			</p>
		</div>
	)
}

const mapDispatchToProps = (dispatch) => ({
	setCurrentUser: (user) => dispatch(setCurrentUser(user)),
})

export default connect(null, mapDispatchToProps)(LoginForm)
