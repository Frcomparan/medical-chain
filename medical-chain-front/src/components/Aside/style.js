import styled from 'styled-components'

export const StyledAside = styled.aside`
	background-color: #d9d9d9;
	display: flex;
	flex-direction: column;
	align-items: center;

	figure {
		padding: 12px;
		max-height: 20%;
		width: 90%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		img {
			width: auto;
			max-height: 100%;
		}
	}

	h1 {
		font-weight: 600;
		margin: 10px 0 0;
		font-size: 2rem;
		color: #525b81;
	}

	.link-options {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-top: 40px;
		gap: 40px;

		.option {
			width: 60%;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			gap: 20px;

			i,
			a {
				color: #525b81;
			}

			i {
				font-size: 1.5rem;
			}

			a {
				font-size: 2rem;
				margin: 0;
				text-decoration: none;
			}

			&:hover i,
			&:hover a {
				color: #2b2f44;
			}
		}
	}
`
