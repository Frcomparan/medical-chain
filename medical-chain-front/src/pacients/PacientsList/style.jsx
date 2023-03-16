import styled from 'styled-components'

export const StyledPacientList = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	row-gap: 20px;
	column-gap: 100px;

	& > h1 {
		grid-area: 1 / 1 / 3 / 3;
	}
`
