import React from 'react'
import { Link, useParams } from 'react-router-dom'

import ConsoleForm from '../../components/console-form/console-form.component'
import './console-page.style.scss'

function ConsolePage() {
	const { pathId } = useParams()

	return (
		<div className='console-page'>
			<div className='console-page__container'>
				<div className='console-page__container__nav'>
					<p className='console-page__container__nav--header'>Add Project</p>
					<Link to='/add/webdesign' className={`console-page__container__nav--action ${pathId === 'webdesign' && 'active'}`}>
						Web Design
					</Link>
					<Link to='/add/card' className={`console-page__container__nav--action ${pathId === 'card' && 'active'}`}>
						Card
					</Link>
					<Link to='/add/icon' className={`console-page__container__nav--action ${pathId === 'icon' && 'active'}`}>
						Icon
					</Link>
					<p className='console-page__container__nav--ending'>⤴</p>
				</div>
				<div className='console-page__container__content'>
					<ConsoleForm pathId={pathId} />
				</div>
			</div>
		</div>
	)
}

export default ConsolePage
