import React, { useContext } from 'react'
import styled from 'styled-components'
import { Context } from '../../Context'
import Pacient from '../Pacient'
import { StyledPacientList } from './style'

const H1 = styled.h1`
	color: red;
	font-size: 20px;
`

function PacientsList() {
	const { isHome } = useContext(Context)

	return (
		<StyledPacientList>
			<h1>Pacients</h1>
			<Pacient />
			<Pacient />
			<Pacient />
			<Pacient />
			<Pacient />
		</StyledPacientList>
	)
}

export default PacientsList
