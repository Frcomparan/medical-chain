import React from 'react'
import { StyledCard, H2 } from './style'

export default function Pacient() {
	return (
		<StyledCard className='pacient-card' href='#'>
			<img
				src='https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_female-512.png'
				alt='female user icon'
			/>
			<section>
				<h2>Some paciente name</h2>
				<div>
					<span>Age:</span>
					<p>30 years</p>
					<span>Weight:</span>
					<p>80kg</p>
				</div>
				<div>
					<span>Last record:</span>
					<p>01/01/2000</p>
				</div>
			</section>
		</StyledCard>
	)
}
