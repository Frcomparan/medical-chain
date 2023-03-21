import React from 'react';
import { StyledCard, H2 } from './style';

export default function PacientCard({
  BloodType,
  Heigh,
  Id,
  LastName,
  Name,
  Weight,
}) {
  return (
    <StyledCard className='pacient-card' href={`/pacients/${Id}`}>
      <img
        src='https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_female-512.png'
        alt='female user icon'
      />
      <section>
        <h2>
          {Name} {LastName}
        </h2>
        <div>
          <span>Height:</span>
          <p>{Heigh} cm</p>
          <span>Weight:</span>
          <p>{Weight} kg</p>
        </div>
        <div>
          <span>Last record:</span>
          <p>01/01/2000</p>
        </div>
      </section>
    </StyledCard>
  );
}
