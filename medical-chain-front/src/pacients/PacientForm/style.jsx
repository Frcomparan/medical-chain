import styled from 'styled-components';

export const StyledPacientForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  section {
    width: 100%;
    display: flex;
    gap: 20px;
  }

  section:nth-child(2) {
    width: 100%;

    & .field:nth-child(1) {
      width: 35%;
    }

    & .field:nth-child(2) {
      width: 35%;
    }

    & .field:nth-child(3) {
      width: 30%;
    }
  }

  section:nth-child(3) .field {
    width: 25%;
  }

  .field label {
    font-size: 1.1rem;
    font-weight: 500;
  }

  .form-control,
  .field select.form-control {
    font-size: 1.3rem;
    min-height: 50px;
  }

  .actions {
    display: grid;
    place-items: center;

    input {
      padding: 10px;
      width: 40%;
    }

    input:hover {
      transform: scale(1.05);
    }
  }
`;
