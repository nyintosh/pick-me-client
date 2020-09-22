import React, { Fragment } from 'react'
import { Switch, Route } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import { selectCurrentUser } from './redux/user/user.selector'

import LandingPage from './pages/landing-page/landing-page.component'
import BrowsePage from './pages/browse-page/browse-page.component'
import PreviewPage from './pages/preview-page/preview-page.component'
import Header from './components/header/header.component'
import AuthPage from './pages/auth-page/auth-page.component'
import ProfilePage from './pages/profile-page/profile-page.component'
import EditProjectPage from './pages/edit-project-page/edit-project-page.component'
import SettingsPage from './pages/settings-page/settings-page.component'
import ConsolePage from './pages/console-page/console-page.component'
import CheckoutPage from './pages/checkout-page/checkout-page.component'
import './app.scss'

function App({ currentUser }) {
	return (
		<Fragment>
			<Header />
			<Switch>
				<Route exact path='/' component={LandingPage} />
				<Route path='/auth' render={() => (currentUser ? window.history.back() : <AuthPage />)} />
				<Route path='/browse/:pathId' component={BrowsePage} />
				<Route path='/preview/:pathId' component={PreviewPage} />
				<Route path='/user/:userId' component={ProfilePage} />
				<Route path='/edit-project/:urlId' component={EditProjectPage} />
				<Route path='/settings/:pathId' render={() => (currentUser ? <SettingsPage /> : window.history.back())} />
				<Route path='/add/:pathId' render={() => (currentUser ? <ConsolePage /> : window.history.back())} />
				<Route exact path='/checkout' component={CheckoutPage} />
			</Switch>
		</Fragment>
	)
}

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
})

export default connect(mapStateToProps)(App)
