import React from 'react'
import { StyledAside } from './style'

export default function Aside() {
	return (
		<StyledAside>
			<h1>Medical Chain</h1>
			<figure>
				<img
					src='https://www.directmedico.com/images/logo_medicos.png'
					alt='caduceo'
				/>
			</figure>
			<div className='link-options'>
				<div className='option'>
					<i class='fa-solid fa-user'></i>
					<a href='/pacients'>Pacients</a>
				</div>
				<div className='option'>
					<i class='fa-solid fa-user-doctor'></i>
					<a href='/'>Doctors</a>
				</div>
			</div>
		</StyledAside>
	)
}
