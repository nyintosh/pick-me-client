import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faEnvelope, faLock, faInfoCircle, faSpinner } from '@fortawesome/free-solid-svg-icons'

import UserService from '../../../services/user.service'
import { setCurrentUser } from '../../../redux/user/user.actions'

function RegisterForm({ setCurrentUser }) {
	const [input, setInput] = useState({ username: '', email: '', password: '', confirm_password: '' })
	const [valid, setValid] = useState({ username: false, email: false, password: false, confirm_password: false })

	const blurHandler = (e) => {
		const regex = {
			password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g,
			username: /[a-z0-9]{3,}/,
			email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
		}

		const setError = (name) => {
			e.target.parentElement.setAttribute('error', name)
			e.target.parentElement.classList.add('--invalid')
			e.target.parentElement.parentElement.style.marginBottom = '22px'
		}
		const clearError = () => {
			e.target.parentElement.setAttribute('error', '')
			e.target.parentElement.classList.remove('--invalid')
			e.target.parentElement.parentElement.style.marginBottom = '0'
		}

		const { name } = e.target
		switch (name) {
			case 'username':
				if (input.username.match(regex.username)) {
					setValid({ ...valid, [name]: true })
					clearError()
				} else {
					setValid({ ...valid, [name]: false })
					setError('Invalid username!')
				}
				break
			case 'email':
				if (input.email.match(regex.email)) {
					setValid({ ...valid, [name]: true })
					clearError()
				} else {
					setValid({ ...valid, [name]: false })
					setError('Invalid email!')
				}
				break
			case 'password':
				if (input.password.match(regex.password)) {
					setValid({ ...valid, [name]: true })
					clearError()
				} else {
					setValid({ ...valid, [name]: false })
					setError('Invalid password!')
				}
				break
			case 'confirm_password':
				if (input.confirm_password === input.password) {
					setValid({ ...valid, [name]: true })
					clearError()
				} else {
					setValid({ ...valid, [name]: false })
					setError('Passwords do not match!')
				}
				break
			default:
				break
		}
	}

	const registerHandler = async (e) => {
		e.preventDefault()
		const error = document.getElementById('--register-error')
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

		if (valid.username && valid.email && valid.password && valid.confirm_password) {
			const setError = (id, msg) => {
				const e = document.getElementById(`${id}-box`)
				e.setAttribute('error', msg)
				e.classList.add('--invalid')
				e.parentElement.style.marginBottom = '22px'
			}
			const clearError = (id) => {
				const e = document.getElementById(`${id}-box`)
				e.setAttribute('error', '')
				e.classList.remove('--invalid')
				e.parentElement.style.marginBottom = '0'
			}

			const register = () => {
				UserService.saveUser({ username: input.username, email: input.email, password: input.confirm_password })
					.then((res) => {
						res.status === 200 && setCurrentUser({ ...res.data })
					})
					.finally(() => clearProgress())
			}

			await axios.all([UserService.getUserByUsername(input.username), UserService.getUserByEmail(input.email)]).then(
				axios.spread((res1, res2) => {
					res1.data ? setError('username', 'Username already exist!') : clearError('username')
					res2.data ? setError('email', 'Email already exist!') : clearError('email')

					!res1.data && !res2.data && register()
				})
			)
		} else {
			error.textContent = `Required to valid all the fields!`
			clearProgress()
		}
	}

	return (
		<div className='auth-form-container'>
			<div className='auth-form-container__title'>
				<p className='auth-form-container__title--header'>Pick Me</p>
				<p className='auth-form-container__title--label'>Enter your information to register</p>
				<p id='--register-error' className='--auth-error'></p>
			</div>
			<form id='login-form' className='auth-form-container__form' onSubmit={(e) => registerHandler(e)}>
				<div className='auth-form-container__form--input'>
					<div className='form-input'>
						<label className='form-input--label'>username</label>
						<div id='username-box' className='form-input__input-box'>
							<div className='form-input__input-box--icon'>
								<FontAwesomeIcon icon={faUser} />
							</div>
							<input
								type='text'
								name='username'
								value={input.username}
								className='form-input__input-box--input'
								onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value.replace(/ /g, '').toLowerCase() })}
								onBlur={(e) => blurHandler(e)}
								autoComplete='on'
							/>
						</div>
					</div>
				</div>
				<div className='auth-form-container__form--input'>
					<div className='form-input'>
						<label className='form-input--label'>email</label>
						<div id='email-box' className='form-input__input-box'>
							<div className='form-input__input-box--icon'>
								<FontAwesomeIcon icon={faEnvelope} />
							</div>
							<input
								type='email'
								name='email'
								value={input.email}
								className='form-input__input-box--input'
								onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
								onBlur={(e) => blurHandler(e)}
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
								onBlur={(e) => blurHandler(e)}
								autoComplete='off'
							/>
						</div>
					</div>
					<div className='form-password-info-box'>
						<FontAwesomeIcon icon={faInfoCircle} />
					</div>
				</div>
				<div className='auth-form-container__form--input'>
					<div className='form-input'>
						<label className='form-input--label'>confirm password</label>
						<div className='form-input__input-box'>
							<div className='form-input__input-box--icon'>
								<FontAwesomeIcon icon={faLock} />
							</div>
							<input
								type='password'
								name='confirm_password'
								value={input.confirm_password}
								className='form-input__input-box--input'
								onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
								onBlur={(e) => blurHandler(e)}
								autoComplete='off'
							/>
						</div>
					</div>
				</div>
				<button type='submit' className='auth-form-submit --action-button' value='Register'>
					<FontAwesomeIcon icon={faSpinner} />
				</button>
			</form>
			<hr />
			<p className='auth-form-container--help'>
				Already member?{' '}
				<Link to='/auth/login' className='--link-blue-highlight'>
					Login
				</Link>
			</p>
		</div>
	)
}

const mapDispatchToProps = (dispatch) => ({
	setCurrentUser: (user) => dispatch(setCurrentUser(user)),
})

export default connect(null, mapDispatchToProps)(RegisterForm)
