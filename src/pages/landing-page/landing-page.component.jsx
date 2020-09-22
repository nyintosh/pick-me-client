import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import axios from 'axios'

import { selectCurrentUser } from '../../redux/user/user.selector'
import ProjectService from '../../services/project.service'

import PreLoader from '../../components/pre-loader/pre-loader.component'
import ItemCard from '../../components/item-card/item-card.components'
import Footer from '../../components/footer/footer.component'
import './landing-page.style.scss'

function LandingPage({ currentUser }) {
	window.onscroll = () => {
		const content = document.querySelector('#bp-content')
		const header = document.querySelector('#header')

		if (content) {
			window.pageYOffset > 20 ? (header.style.height = '50px') : (header.style.height = '')

			if (window.pageYOffset > 490) {
				content.style.width = '100%'
				content.style.borderRadius = '0'
			} else {
				content.style.width = ''
				content.style.borderRadius = ''
			}
		}
	}

	const [webdesigns, setWebdesigns] = useState([])
	const [cards, setCards] = useState([])
	const [icons, setIcons] = useState([])
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		setIsLoaded(false)
		axios
			.all([
				ProjectService.getAllByLimitDescOrder('webdesign', 7),
				ProjectService.getAllByLimitDescOrder('card', 7),
				ProjectService.getAllByLimitDescOrder('icon', 11),
			])
			.then(
				axios.spread((res1, res2, res3) => {
					if (res1.status === 200 && res2.status === 200 && res3.status === 200) {
						setWebdesigns(res1.data)
						setCards(res2.data)
						setIcons(res3.data)
					}
				})
			)
			.finally(() => {
				setTimeout(() => setIsLoaded(true), 400)
			})
	}, [])
	window.scrollTo(0, 0)

	const slideHandler = (e, dir) => {
		const el = e.target.parentElement.children[2]
		dir === 'R' && (el.scrollLeft = parseInt(getComputedStyle(el).getPropertyValue('width')))
		dir === 'L' && (el.scrollLeft = 0)
	}

	return (
		<div className='landing-page' id='landing-page'>
			{webdesigns.length !== 0 || cards.length !== 0 || icons.length !== 0 || isLoaded ? (
				<>
					<div className='landing-page__intro'>
						<div className='landing-page__intro__container'>
							<p className='landing-page__intro--desc'>
								Discover prebuild projects for inspiring you and boost your production
							</p>
							<div className='landing-page__intro--action'>
								<span>Add your project?</span>{' '}
								<Link to={`${currentUser ? '/add/webdesign' : '/auth/login'}`} className='--action-button'>
									Get Started
								</Link>
							</div>
						</div>
					</div>
					<div className='landing-page__content' id='bp-content'>
						<div className='landing-page__content__container'>
							<div className='landing-page__content__item'>
								<button className='slide-left' onClick={(e) => slideHandler(e, 'L')}>
									<FontAwesomeIcon icon={faChevronLeft} />
								</button>
								{webdesigns.length !== 0 && (
									<>
										<div className='landing-page__content__item--header'>
											<p>Latest Web Designs</p>
											<Link to='/browse/webdesign'>View All</Link>
										</div>
										<div className='landing-page__content__item--cards'>
											{webdesigns.map((el, idx) => (
												<ItemCard
													key={idx}
													image={el.image1}
													pid={el.id}
													type={el.type}
													uid={el.userId}
													label={el.label}
												/>
											))}
										</div>
									</>
								)}
								<button className='slide-right' onClick={(e) => slideHandler(e, 'R')}>
									<FontAwesomeIcon icon={faChevronRight} />
								</button>
							</div>
							<div className='landing-page__content__item'>
								<button className='slide-left' onClick={(e) => slideHandler(e, 'L')}>
									<FontAwesomeIcon icon={faChevronLeft} />
								</button>
								{cards.length !== 0 && (
									<>
										<div className='landing-page__content__item--header'>
											<p>Latest Cards</p>
											<Link to='/browse/card'>View All</Link>
										</div>
										<div className='landing-page__content__item--cards'>
											{cards.map((el, idx) => (
												<ItemCard
													key={idx}
													image={el.image1}
													pid={el.id}
													type={el.type}
													uid={el.userId}
													label={el.label}
												/>
											))}
										</div>
									</>
								)}
								<button className='slide-right' onClick={(e) => slideHandler(e, 'R')}>
									<FontAwesomeIcon icon={faChevronRight} />
								</button>
							</div>
							<div className='landing-page__content__item'>
								<button className='slide-left' onClick={(e) => slideHandler(e, 'L')}>
									<FontAwesomeIcon icon={faChevronLeft} />
								</button>
								{icons.length !== 0 && (
									<>
										<div className='landing-page__content__item--header'>
											<p>Latest Icons</p>
											<Link to='/browse/icon'>View All</Link>
										</div>
										<div className='landing-page__content__item--cards'>
											{icons.map((el, idx) => (
												<ItemCard
													key={idx}
													image={el.image1}
													pid={el.id}
													type={el.type}
													uid={el.userId}
													label={el.label}
												/>
											))}
										</div>
									</>
								)}
								<button className='slide-right' onClick={(e) => slideHandler(e, 'R')}>
									<FontAwesomeIcon icon={faChevronRight} />
								</button>
							</div>
						</div>
					</div>
					<Footer />
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

export default connect(mapStateToProps)(LandingPage)
