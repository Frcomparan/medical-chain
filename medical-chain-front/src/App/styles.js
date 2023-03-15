import { useContext } from 'react'
import styled from 'styled-components'

export const Main = styled.main`
	max-height: 100vh;
	min-width: 100vw;
	display: grid;
	grid-template-columns: repeat(10, 1fr);
	grid-template-rows: repeat(10, 1fr);

	& > nav {
		/* grid-area: 1 / 3 / 2 / 11; */
		grid-area: ${({ isHome }) =>
			isHome ? '1 / 3 / 4 / 11' : '1 / 3 / 2 / 11'};
	}

	& > aside {
		grid-area: 1 / 1 / 11 / 3;
	}

	.content {
		grid-area: ${({ isHome }) =>
			isHome ? '4 / 3 / 11 / 11' : '2 / 3 / 11 / 11'};
		overflow-y: overlay;
		padding: 30px 80px;
	}
`
