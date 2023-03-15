import React, { useContext, useEffect } from 'react'
import { Context } from '../Context'
import PacientsList from '../pacients/PacientsList'

async function getResponse() {
	const url = `http://localhost:8080/api/pacients/1`
	const resp = await fetch(url)
	const data = await resp.json()
	console.log({ resp })
	console.log({ data })
	data.map((item) => {
		console.log({ item })
	})
}

function Home() {
	const { isHome, activateHome } = useContext(Context)
	useEffect(activateHome, [])
	console.log(isHome)

	return (
		<div>
			<h1>This is the home</h1>
		</div>
	)
}

export default Home
