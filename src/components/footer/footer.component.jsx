import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHackerrank, faInstagram, faFacebookSquare, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'

import LOGO from '../../assets/LOGO'
import './footer.style.scss'

function Footer() {
	return (
		<div className='footer'>
			<div className='footer__container'>
				<div className='footer__container__content'>
					<div className='footer__container__content__links'>
						<p>Navigation</p>
						<div>
							<span style={{ pointerEvents: 'none' }}>Go To :</span>
							<Link to='/browse/webdesign'>Web Designs</Link>
							<Link to='/browse/card'>Cards</Link>
							<Link to='/browse/icon'>Icons</Link>
						</div>
					</div>
					<div className='footer__container__content__contact'>
						<p>Developer Contact</p>
						<div>
							<a href='https://www.facebook.com/nyintosh' target='_blank' rel='noopener noreferrer'>
								<FontAwesomeIcon icon={faFacebookSquare} />
							</a>
							<a href='https://www.instagram.com/nyintosh' target='_blank' rel='noopener noreferrer'>
								<FontAwesomeIcon icon={faInstagram} />
							</a>
							<a href='https://www.linkedin.com/in/nyintosh/' target='_blank' rel='noopener noreferrer'>
								<FontAwesomeIcon icon={faLinkedin} />
							</a>
							<a href='https://www.github.com/nyintosh' target='_blank' rel='noopener noreferrer'>
								<FontAwesomeIcon icon={faGithub} />
							</a>
							<a href='https://www.hackerrank.com/nyihtun' target='_blank' rel='noopener noreferrer'>
								<FontAwesomeIcon icon={faHackerrank} />
							</a>
						</div>
					</div>
				</div>
				<div className='footer__container--break'>
					<LOGO />
					<LOGO />
					<LOGO />
				</div>
				<div className='footer__container__policies'>
					<span>Terms & Conditions</span> <span>Privacy & Policy</span> <span>©2020 Pick Me - All Right Reserved</span>
				</div>
			</div>
		</div>
	)
}

export default Footer
