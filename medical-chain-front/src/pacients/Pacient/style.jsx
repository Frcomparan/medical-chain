import styled from 'styled-components'

export const StyledPacient = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  /* max-width: 780px;
  margin: 0 auto; */

  h1 {
    text-align: center;
  }

  .pacient-container {
    display: flex;
  }

  .pacient-info {
    width: 70%;
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-direction: column;
  }

  .data-section {
    display: flex;
    justify-content: space-between;
    gap: 10px;

    &:nth-child(1) .data {
      width: 50%;
    }

    &:nth-child(2) .data {
      width: 33%;
    }

    .data {
      border-radius: 20px;
      background-color: #d9d9d9;
      padding: 15px 30px;

      span {
        font-size: 1.2rem;
        font-weight: 600;
      }

      p {
        font-size: 1.4rem;
        margin: 0;
      }
    }
  }

  img {
    width: 30%;
    object-fit: contain;
  }

  a {
    width: 30%;
    font-size: 1.2rem;
  }
`
