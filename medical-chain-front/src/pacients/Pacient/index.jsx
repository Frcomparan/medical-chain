import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../../Context';
import { useFetchPacients } from '../../hooks/useFetchPacients';
import { StyledPacient } from './style';

export default function Pacient() {
  const { id } = useParams();
  const [pacient, setPacient] = useState([]);

  const getPacient = async () => {
    const url = `http://localhost:8080/api/pacients/${id}`;
    const resp = await fetch(url);
    const data = await resp.json();
    setPacient(data);
  };

  useEffect(() => {
    getPacient();
  }, []);

  return (
    <StyledPacient>
      <h1>
        {pacient.Name} {pacient.LastName}
      </h1>
      <div className='pacient-container'>
        <img
          src='https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_female-512.png'
          alt='pacient-icon'
        />
        <div className='pacient-info'>
          <div className='data-section'>
            <div className='data'>
              <span>Weight</span>
              <p>{pacient.Weight} kg</p>
            </div>
            <div className='data'>
              <span>Height</span>
              <p>{pacient.Heigh} cm</p>
            </div>
          </div>
          <div className='data-section'>
            <div className='data'>
              <span>Birthdate</span>
              <p>01/01/2000</p>
            </div>
            <div className='data'>
              <span>Genre</span>
              <p>Female</p>
            </div>
            <div className='data'>
              <span>Type of Blood</span>
              <p>{pacient.BloodType}</p>
            </div>
          </div>
        </div>
      </div>
      <a href={`/pacients/${id}/edit`} className='btn btn-primary'>
        Edit
      </a>
    </StyledPacient>
  );
}
