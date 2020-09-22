import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import { setCurrentUser } from '../../redux/user/user.actions'
import { selectCurrentUser } from '../../redux/user/user.selector'
import UserService from '../../services/user.service'

import AccountSettings from '../../components/account-settings/account-settings.component'
import PasswordSettings from '../../components/password-settings/password-settings.component'
import './settings-page.style.scss'

function SettingsPage({ currentUser, setCurrentUser }) {
	const { pathId } = useParams()
	const [input, setInput] = useState({ username: currentUser.username, email: currentUser.email })
	const [valid, setValid] = useState({ username: true, email: true })

	const focusHandler = (e) => {
		setValid({ ...valid, [e.target.name]: false })
		e.target.parentElement.setAttribute('error', '')
		e.target.parentElement.classList.remove('--error')
	}
	const changeHandler = (e) => {
		setInput({ ...input, [e.target.name]: e.target.value.replace(/ /g, '').toLowerCase() })
	}
	const blurHandler = (e) => {
		const regex = {
			email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
			username: /[a-z0-9]{3,}/,
		}

		const setError = (msg) => {
			e.persist()
			e.target.parentElement.setAttribute('error', msg)
			e.target.parentElement.classList.add('--error')
		}
		const clearError = () => {
			e.persist()
			e.target.parentElement.setAttribute('error', '')
			e.target.parentElement.classList.remove('--error')
		}

		switch (e.target.name) {
			case 'username':
				if (input.username.match(regex.username)) {
					if (input.username !== currentUser.username) {
						UserService.getUserByUsername(input.username).then((res) => {
							if (!res.data) {
								setValid({ ...valid, username: true })
								clearError()
							} else {
								setValid({ ...valid, username: false })
								setError('Username already in used, try another!')
							}
						})
					}
					clearError()
				} else {
					setValid({ ...valid, username: false })
					setError('Invalid username, try another!')
				}
				break
			case 'email':
				if (input.email.match(regex.email)) {
					if (input.email !== currentUser.email) {
						UserService.getUserByEmail(input.email).then((res) => {
							if (!res.data) {
								setValid({ ...valid, email: true })
								clearError()
							} else {
								setValid({ ...valid, email: false })
								setError('Email already in used, try another!')
							}
						})
					}
					clearError()
				} else {
					setValid({ ...valid, email: false })
					setError('Invalid email, try another!')
				}
				break
			default:
				break
		}
	}

	const saveAction = () => {
		const btn = document.querySelector('.settings-submit')

		const setProgress = () => {
			document.body.style.pointerEvents = 'none'
			btn.classList.add('processing')
		}
		const clearProgress = () => {
			document.body.style.pointerEvents = ''
			btn.classList.remove('processing')
		}
		setProgress()

		if (pathId === 'account') {
			if (valid.username && valid.email) {
				UserService.updateUser(currentUser.email, { ...currentUser, username: input.username, email: input.email })
					.then((res) => {
						const msg = document.querySelector('#acc-set-msg')

						if (res.status === 200) {
							setCurrentUser({ ...res.data })
							msg.textContent = 'Updated changes successfully!'
							msg.style.color = '#43a047'
						} else {
							msg.textContent = 'Oops, somethings is not right!'
							msg.style.color = '#f44336'
						}
					})
					.finally(() => clearProgress())
			}
		}
	}

	return (
		<div className='settings-page'>
			<div className='settings-page__container'>
				<div className='settings-page__container__nav'>
					<p className='settings-page__container__nav--header'>Account</p>
					<Link to='/settings/account' className={`settings-page__container__nav--action ${pathId === 'account' && 'active'}`}>
						Information
					</Link>
					<Link to='/settings/password' className={`settings-page__container__nav--action ${pathId === 'password' && 'active'}`}>
						Password
					</Link>
					<button onClick={saveAction} className='settings-submit --action-button' value='Save Changes'>
						<FontAwesomeIcon icon={faSpinner} />
					</button>
					<p className='settings-page__container__nav--ending'>⤴</p>
				</div>
				<div className='settings-page__container__content'>
					{pathId === 'account' ? (
						<AccountSettings
							input={input}
							onfocus={(e) => focusHandler(e)}
							onchange={(e) => changeHandler(e)}
							onblur={(e) => blurHandler(e)}
						/>
					) : pathId === 'password' ? (
						<PasswordSettings />
					) : (
						(window.location.href = '/settings/account')
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
	setCurrentUser: (user) => dispatch(setCurrentUser(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage)
