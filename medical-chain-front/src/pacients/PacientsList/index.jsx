import React, { useContext } from 'react';
import { Context } from '../../Context';
import PacientCard from '../PacientCard';
import { StyledPacientList } from './style';

function PacientsList() {
  const { pacients } = useContext(Context);

  return (
    <StyledPacientList>
      <h1>Pacients</h1>
      {pacients.map((pacient) => {
        return <PacientCard key={pacient.Id} {...pacient} />;
      })}
    </StyledPacientList>
  );
}

export default PacientsList;
