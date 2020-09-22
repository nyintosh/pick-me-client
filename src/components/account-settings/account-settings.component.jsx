import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import UserService from '../../services/user.service'
import { selectCurrentUser } from '../../redux/user/user.selector'

import './account-settings.style.scss'
import { removeCurrentUser } from '../../redux/user/user.actions'

function AccountSettings({ currentUser, removeCurrentUser, input, onfocus, onchange, onblur }) {
	const deleteHandler = () => {
		const conf = window.confirm('There is no way back! Are you sure want to do this?')
		if (conf) {
			UserService.deleteUser(currentUser.email).then((res) => {
				removeCurrentUser()
				window.location.href = '/'
			})
		}
	}

	return (
		<div className='account-settings'>
			<div className='account-settings__header'>
				<p className='account-settings__header--title'>Your Account Information</p>
				<p id='acc-set-msg'></p>
			</div>
			<div className='account-settings__content' id='acc-inf-username'>
				<p className='account-settings__content--title'>Your Username</p>
				<p className='account-settings__content--info'>(This is how people can search you on Pick Me)</p>
				<input
					type='text'
					name='username'
					value={input.username}
					className='account-settings__content--input'
					onFocus={onfocus}
					onChange={onchange}
					onBlur={onblur}
				/>
			</div>
			<hr />
			<div className='account-settings__content' id='acc-inf-email'>
				<p className='account-settings__content--title'>Your Email</p>
				<input
					type='text'
					name='email'
					value={input.email}
					className='account-settings__content--input'
					onFocus={onfocus}
					onChange={onchange}
					onBlur={onblur}
				/>
			</div>
			<hr />
			<div className='account-settings__content'>
				<p className='account-settings__content--title'>Delete Accounts</p>
				<p className='account-settings__content--info'>If you delete your account all the data will be permanently lost.</p>
				<button onClick={deleteHandler}>Delete Account</button>
			</div>
			<p className='account-settings--ending'>⤴</p>
		</div>
	)
}

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
})

const mapDispatchToProps = (dispatch) => ({
	removeCurrentUser: () => dispatch(removeCurrentUser()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings)
