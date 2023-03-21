import React from 'react';
import { StyledCard, H2 } from './style';

export default function PacientCard({
  Height,
  Id,
  LastName,
  Name,
  Weight,
  Birthdate,
  Genre,
}) {
  return (
    <StyledCard className='pacient-card' href={`/pacients/${Id}`}>
      <img
        // src='https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_female-512.png'
        src={
          Genre == 'Male'
            ? 'https://cdn-icons-png.flaticon.com/512/18/18148.png'
            : 'https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_female-512.png'
        }
        alt='female user icon'
      />
      <section>
        <h2>
          {Name} {LastName}
        </h2>
        <div>
          <span>Height:</span>
          <p>{Height} cm</p>
          <span>Weight:</span>
          <p>{Weight} kg</p>
        </div>
        <div>
          <span>Birthdate:</span>
          <p>{Birthdate}</p>
        </div>
      </section>
    </StyledCard>
  );
}
