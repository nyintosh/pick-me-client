import React from 'react'

import './pre-loader.style.scss'

function PreLoader() {
	return (
		<div id='n-preloader' className='container'>
			<div id='n-preloader'>
				<div id='n-preloader__circle'>
					<div id='n-preloader__circle--dot'></div>
				</div>
				<p id='n-preloader__info'>Just a sec . . .</p>
			</div>
		</div>
	)
}

export default PreLoader
