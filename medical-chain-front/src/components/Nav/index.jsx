import React, { useContext } from 'react'
import { Context } from '../../Context'
import { StyledNav } from './styles'

export default function Nav() {
	const { isHome } = useContext(Context)

	return (
		<StyledNav>
			<section className='top-section'>
				<div className='left'>
					<a href='/'>Home</a>
					<a href='/'>Dashboard</a>
					<a href='/'>About Us</a>
				</div>
				<div className='right'>
					<a href='#'>Login</a>
				</div>
			</section>
			{isHome && (
				<section className='bottom-section'>
					<div>
						<h2>The best way to manage your medical records</h2>
						<p>
							Take control of your information, have total access to your
							medical information everywhere and shared only with the people you
							want
						</p>
					</div>
					<div>
						<button>Learn more</button>
					</div>
				</section>
			)}
		</StyledNav>
	)
}
