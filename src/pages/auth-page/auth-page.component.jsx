import React from 'react'
import { Switch, Route } from 'react-router-dom'

import LoginForm from '../../components/auth-form/login-form/login-form.component'
import RegisterForm from '../../components/auth-form/register-form/register-form.component'
import ForgotForm from '../../components/auth-form/forgot-form/forgot-form.component'
import './auth-page.style.scss'
import '../../components/auth-form/auth-form.style.scss'

function AuthPage() {
	return (
		<div className='authpage'>
			<div className='authpage--formcontainer'>
				<button className='authpage--formcontainer--close' onClick={() => window.history.back()}>
					<span></span>
				</button>
				<Switch>
					<Route path='/auth/login' component={LoginForm} />
					<Route path='/auth/register' component={RegisterForm} />
					<Route path='/auth/forgot' component={ForgotForm} />
					<Route path='/auth' render={() => (window.location.href = '/auth/login')} />
				</Switch>
			</div>
			<div className='authpage--image'></div>
		</div>
	)
}

export default AuthPage
