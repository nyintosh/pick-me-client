import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import ProjectService from '../../services/project.service'

import PreLoader from '../../components/pre-loader/pre-loader.component'
import ItemCard from '../../components/item-card/item-card.components'
import Footer from '../../components/footer/footer.component'
import './browse-page.style.scss'

function BrowsePage() {
	const { pathId } = useParams()
	const [projects, setProjects] = useState([])
	const [isLoaded, setIsLoaded] = useState(false)

	if (pathId !== 'webdesign' && pathId !== 'card' && pathId !== 'icon') window.location.href = '/browse/webdesign'

	useEffect(() => {
		setIsLoaded(false)
		ProjectService.getAllByTypeDescOrder(pathId)
			.then((res) => {
				res.status === 200 && setProjects(res.data)
			})
			.finally(() => {
				setTimeout(() => setIsLoaded(true), 400)
			})
	}, [pathId])
	window.scrollTo(0, 0)

	return (
		<div className='browse-page'>
			{projects.length !== 0 && isLoaded ? (
				<>
					<div className='browse-page__container'>
						<p className='browse-page--title'>{pathId}</p>
						<div className='browse-page__content'>
							{projects.map((el, idx) => (
								<ItemCard key={idx} image={el.image1} pid={el.id} type={el.type} uid={el.userId} label={el.label} />
							))}
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

export default BrowsePage
