import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faSpinner } from '@fortawesome/free-solid-svg-icons'

import UserService from '../../../services/user.service'

function ForgotForm() {
	const [email, setEmail] = useState('')

	const forgotHandler = (e) => {
		e.preventDefault()
		const error = document.querySelector('#--forgot-error')
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

		if (email) {
			UserService.getUserByEmail(email)
				.then((res) => {
					if (res.data) {
						const temp = document.createElement('textarea')
						error.appendChild(temp)
						temp.value = res.data.password
						temp.select()
						document.execCommand('copy')
						error.removeChild(temp)
						alert('Your password is copied to Clipboard!')
						error.textContent = ''
					} else {
						error.textContent = `Email doesn't exist!`
					}
				})
				.finally(() => clearProgress())
		} else {
			error.textContent = 'Invalid email!'
			clearProgress()
		}
	}

	return (
		<div className='auth-form-container'>
			<div className='auth-form-container__title'>
				<p className='auth-form-container__title--header'>Pick Me</p>
				<p className='auth-form-container__title--label'>Enter your email to request password</p>
				<p id='--forgot-error' className='--auth-error'></p>
			</div>
			<form className='auth-form-container__form' onSubmit={(e) => forgotHandler(e)}>
				<div className='auth-form-container__form--input'>
					<div className='form-input'>
						<label className='form-input--label'>email</label>
						<div className='form-input__input-box'>
							<div className='form-input__input-box--icon'>
								<FontAwesomeIcon icon={faEnvelope} />
							</div>
							<input
								type='email'
								value={email}
								className='form-input__input-box--input'
								onChange={(e) => setEmail(e.target.value)}
								autoComplete='off'
							/>
						</div>
					</div>
				</div>
				<button type='submit' className='auth-form-submit --action-button' value='Submit'>
					<FontAwesomeIcon icon={faSpinner} />
				</button>
			</form>
			<hr />
			<p className='auth-form-container--help'>
				<Link to='/auth/login' className='--link-blue-highlight'>
					Go back
				</Link>
			</p>
		</div>
	)
}

export default ForgotForm
