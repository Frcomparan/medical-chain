import styled from 'styled-components'

export const StyledCard = styled.a`
	width: 100%;
	background-color: #d9d9d9;
	border-radius: 10px;
	display: flex;
	padding: 20px;
	color: #525b81;
	text-decoration: none;
	font-size: 1.3rem;

	&:hover {
		text-decoration: none;
		transform: scale(1.01);
		color: #525b81;
	}

	img {
		width: 40%;
		object-fit: contain;
	}

	section {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}

	h2 {
		width: 100%;
		font-size: 1.6rem;
		text-align: center;
	}

	div {
	}
`
