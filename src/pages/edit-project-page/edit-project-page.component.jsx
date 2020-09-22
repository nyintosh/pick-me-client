import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import ProjectService from '../../services/project.service'
import { selectCurrentUser } from '../../redux/user/user.selector'

import PreLoader from '../../components/pre-loader/pre-loader.component'
import PLUS_PLACEHOLDER from '../../assets/images/PLUS_PLACEHOLDER.jpg'
import CARD_BACK_PLACEHOLDER from '../../assets/images/CARD_BACK_PLACEHOLDER.jpg'
import './edit-project-page.style.scss'

function EditProjectPage({ currentUser }) {
	const { urlId } = useParams()
	const [input, setInput] = useState({ type: '', image1: '', image2: '', image3: '', label: '', price: '' })
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		setIsLoaded(false)
		ProjectService.getById(urlId)
			.then((res) => {
				if (res.status === 200) {
					if (res.data.userId === currentUser.id) {
						setInput({ ...res.data })
					} else window.history.back()
				}
			})
			.catch(() => {
				window.history.back()
			})
			.finally(() => {
				setTimeout(() => setIsLoaded(true), 400)
			})
	}, [urlId, currentUser.id])

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

	const updateHandler = (e) => {
		e.preventDefault()

		const setProgress = () => {
			document.body.style.pointerEvents = 'none'
		}
		const clearProgress = () => {
			document.body.style.pointerEvents = ''
		}
		setProgress()

		if (input.image1 && input.label) {
			ProjectService.updateById(input.id, { ...input })
				.then((res) => {
					if (res.status === 200) {
						alert('Saved changes successfully!')
						window.history.back()
					}
				})
				.catch(() => alert('Oops, somethings was not right!'))
				.finally(() => clearProgress())
		} else {
			alert('Please fill required fields!')
			clearProgress()
		}
	}

	const deleteHandler = () => {
		const conf = window.confirm('There is no way back! Are you sure want to do this?')
		if (conf) {
			ProjectService.deleteById(input.id).then(() => {
				setTimeout(() => window.history.back(), 400)
			})
		}
	}

	return (
		<div className='edit-project-page'>
			{input.type && isLoaded ? (
				<div className='edit-project-page__container'>
					<div className='edit-project-page__nav'>
						<p className='edit-project-page__nav--header'>Edit Project</p>
						<p className='edit-project-page__nav--save' onClick={updateHandler}>
							Save Action
						</p>
						<p className='edit-project-page__nav--del' onClick={deleteHandler}>
							Delete
						</p>
						<p className='edit-project-page__nav--ending'>⤴</p>
					</div>
					<div className='edit-project-page__content'>
						<div className='edit-project-page__content__form'>
							<div className='edit-project-page__content__form__images'>
								<div className='edit-project-page__content__form__images--image'>
									<img
										alt='user'
										src={`data:image/png;base64,${input.image1}`}
										name='image1'
										className={`preview ${input.type}`}
										onClick={() => document.getElementById('image1').click()}
									/>
									<input type='file' name='image1' id='image1' onChange={(e) => imageInputHandler(e)} />
									<label>Preview Image*</label>
								</div>
								{input.type !== 'icon' && (
									<div className='edit-project-page__content__form__images__image'>
										<div className='edit-project-page__content__form__images__image--image'>
											<img
												alt='user'
												src={
													input.image2
														? `data:image/png;base64,${input.image2}`
														: input.type === 'webdesign'
														? PLUS_PLACEHOLDER
														: CARD_BACK_PLACEHOLDER
												}
												name='image2'
												onClick={() => document.getElementById('image2').click()}
											/>
											<input type='file' name='image2' id='image2' onChange={(e) => imageInputHandler(e)} />
										</div>
										{input.type !== 'card' && (
											<div className='edit-project-page__content__form__images__image--image'>
												<img
													alt='user'
													src={input.image3 ? `data:image/png;base64,${input.image3}` : PLUS_PLACEHOLDER}
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
							<div className='edit-project-page__content__form__input-box'>
								<label>Label*</label>
								<input
									type='text'
									name='label'
									id='label'
									value={input.label}
									onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
								/>
							</div>
							<div className='edit-project-page__content__form__input-box'>
								<label>Price $</label>
								<input type='number' name='price' id='price' value={input.price} onChange={(e) => priceHandler(e)} />
							</div>
							<p className='edit-project-page__content__form--ending'>⤴</p>
						</div>
					</div>
				</div>
			) : (
				<PreLoader />
			)}
		</div>
	)
}

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
})

export default connect(mapStateToProps)(EditProjectPage)
