import React, { useState, useEffect } from 'react'

import ProjectService from '../../services/project.service'

import PreLoader from '../pre-loader/pre-loader.component'
import ItemCard from '../item-card/item-card.components'
import './profile-projects.style.scss'

function ProfileProject({ uid, type }) {
	const [isLoaded, setIsLoaded] = useState(false)
	const [isExist, setIsExist] = useState(false)
	const [projects, setProjects] = useState([])

	useEffect(() => {
		ProjectService.getByUserIdAndType(uid, type)
			.then((res) => {
				if (res.data.length !== 0) {
					setProjects(res.data)
					setIsExist(true)
				}
			})
			.finally(() => setTimeout(() => setIsLoaded(true), 200))
	}, [uid, type])

	return (
		<div className={`profile-project ${isLoaded && projects.length !== 0 && 'loaded'}`}>
			{isLoaded && !isExist ? (
				<p className='profile-project--error'>There are currently no project yet!</p>
			) : isLoaded && isExist ? (
				projects.length !== 0 ? (
					projects.map((el, idx) => (
						<ItemCard key={idx} image={el.image1} pid={el.id} type={el.type} uid={el.userId} label={el.label} />
					))
				) : (
					<PreLoader />
				)
			) : (
				<PreLoader />
			)}
		</div>
	)
}

export default ProfileProject
