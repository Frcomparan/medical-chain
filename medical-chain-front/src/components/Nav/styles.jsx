import styled from 'styled-components'

export const StyledNav = styled.nav`
	width: 100%;
	background-color: blue;

	.top-section,
	.bottom-section {
		padding: 30px 80px;
	}

	.top-section {
		height: 20%;
		display: flex;
		justify-content: space-between;

		.left,
		.right {
			display: flex;
			gap: 40px;

			a {
				font-size: 1.3rem;
				text-decoration: none;
				color: white;
			}

			a:hover {
				font-weight: 700;
			}
		}
	}

	.bottom-section {
		height: 80%;
		color: white;
		display: flex;
		gap: 20px;

		div:nth-child(1) {
			width: 60%;
		}

		div:nth-child(2) {
			display: flex;
			align-items: center;

			button {
				height: auto;
				padding: 20px;
				border: none;
				border-radius: 10px;
				cursor: pointer;
			}

			button:hover {
				transform: scale(1.1);
			}
		}
	}
`
