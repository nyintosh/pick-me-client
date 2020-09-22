import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import { selectCurrentUser } from '../../redux/user/user.selector'
import ProjectService from '../../services/project.service'

import WEB_DESIGN_PLACEHOLDER from '../../assets/images/WEB_DESIGN_PLACEHOLDER.jpg'
import PLUS_PLACEHOLDER from '../../assets/images/PLUS_PLACEHOLDER.jpg'
import CARD_FRONT_PLACEHOLDER from '../../assets/images/CARD_FRONT_PLACEHOLDER.jpg'
import CARD_BACK_PLACEHOLDER from '../../assets/images/CARD_BACK_PLACEHOLDER.jpg'
import ICON_PLACEHOLDER from '../../assets/images/ICON_PLACEHOLDER.jpg'
import './console-form.style.scss'

function ConsoleForm({ pathId, currentUser }) {
	const [input, setInput] = useState({ image1: '', image2: '', image3: '', label: '', price: '' })

	const imageInputHandler = (e) => {
		e.persist()
		try {
			const preview = e.target.parentElement.children[0]
			const reader = new FileReader()
			const file = e.target.files[0]

			reader.onload = () => {
				preview.src = reader.result
				setInput({ ...input, [e.target.name]: reader.result.split(',')[1] })
			}
			reader.readAsDataURL(file)
		} catch (err) {
			// console.log(err)
		}
	}

	const priceHandler = (e) => {
		if (e.target.value > 0) {
			setInput({ ...input, [e.target.name]: e.target.value })
		} else {
			setInput({ ...input, [e.target.name]: '' })
		}
	}

	const saveHandler = (e) => {
		e.preventDefault()
		const preview = document.querySelectorAll('.preview')
		const btn = document.querySelector('.console-form-submit')

		const setProgress = () => {
			document.body.style.pointerEvents = 'none'
			btn.classList.add('processing')
		}
		const clearProgress = () => {
			document.body.style.pointerEvents = ''
			btn.classList.remove('processing')
		}
		setProgress()

		if (input.image1 && input.label) {
			ProjectService.save({ ...input, userId: currentUser.id, type: pathId })
				.then((res) => {
					if (res.status === 200) {
						setInput({ image1: '', image2: '', image3: '', label: '', price: '' })
						switch (pathId) {
							case 'webdesign':
								preview[0].src = WEB_DESIGN_PLACEHOLDER
								preview[1].src = PLUS_PLACEHOLDER
								preview[2].src = PLUS_PLACEHOLDER
								break
							case 'card':
								preview[0].src = CARD_FRONT_PLACEHOLDER
								preview[1].src = CARD_BACK_PLACEHOLDER
								break
							case 'icon':
								preview[0].src = ICON_PLACEHOLDER
								break
							default:
								break
						}
						alert('Project added successfully!')
					}
				})
				.catch(() => alert('Oops, somethings was not right!'))
				.finally(() => clearProgress())
		} else {
			alert('Please fill required fields!')
			clearProgress()
		}
	}

	return (
		<div className='console-form'>
			<form className='console-form__form' onSubmit={(e) => saveHandler(e)}>
				<div className='console-form__form__images'>
					<div className='console-form__form__images--image'>
						<img
							alt='user'
							src={
								pathId === 'webdesign'
									? WEB_DESIGN_PLACEHOLDER
									: pathId === 'card'
									? CARD_FRONT_PLACEHOLDER
									: pathId === 'icon' && ICON_PLACEHOLDER
							}
							name='image1'
							className={`preview ${pathId}`}
							onClick={() => document.getElementById('image1').click()}
						/>
						<input type='file' name='image1' id='image1' onChange={(e) => imageInputHandler(e)} />
						<label>Preview Image*</label>
					</div>
					{pathId !== 'icon' && (
						<div className='console-form__form__images__image'>
							<div className='console-form__form__images__image--image'>
								<img
									alt='user'
									src={pathId === 'webdesign' ? PLUS_PLACEHOLDER : pathId === 'card' && CARD_BACK_PLACEHOLDER}
									name='image2'
									className={`preview`}
									onClick={() => document.getElementById('image2').click()}
								/>
								<input type='file' name='image2' id='image2' onChange={(e) => imageInputHandler(e)} />
							</div>
							{pathId !== 'card' && (
								<div className='console-form__form__images__image--image'>
									<img
										alt='user'
										src={PLUS_PLACEHOLDER}
										name='image3'
										className='preview'
										onClick={() => document.getElementById('image3').click()}
									/>
									<input type='file' name='image3' id='image3' onChange={(e) => imageInputHandler(e)} />
								</div>
							)}
						</div>
					)}
				</div>
				<div className='console-form__form__input-box'>
					<label>Label*</label>
					<input
						type='text'
						name='label'
						id='label'
						value={input.label}
						onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
					/>
				</div>
				<div className='console-form__form__input-box'>
					<label>Price $</label>
					<input type='number' name='price' id='price' value={input.price} onChange={(e) => priceHandler(e)} />
				</div>
				<button type='submit' className='console-form-submit --action-button' value='Submit'>
					<FontAwesomeIcon icon={faSpinner} />
				</button>
				<p className='console-form__form--ending'>⤴</p>
			</form>
		</div>
	)
}

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
})

export default connect(mapStateToProps)(ConsoleForm)
