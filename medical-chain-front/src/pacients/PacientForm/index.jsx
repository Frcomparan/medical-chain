import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StyledPacientForm } from './style';

export default function PacientForm() {
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
    <StyledPacientForm action=''>
      <h1>Add a new pacient</h1>
      <section>
        <div className='field form-group'>
          <label htmlFor='pacientName'>Name</label>
          <input
            className='form-control'
            type='text'
            name='pacientName'
            id='pacientName'
            placeholder={id && pacient.Name}
          />
        </div>
        <div className='field form-group'>
          <label htmlFor='pacientLastName'>Lastname</label>
          <input
            className='form-control'
            type='text'
            name='pacientLastName'
            id='pacientLastName'
            placeholder={id && pacient.LastName}
          />
        </div>
        <div className='field form-group'>
          <label htmlFor='pacientBirthdate'>Birthdate</label>
          <input
            className='form-control'
            type='date'
            name='pacientBirthdate'
            id='pacientBirthdate'
            // placeholder={id && pacient.Name}
          />
        </div>
      </section>
      <section>
        <div className='field'>
          <label htmlFor='pacientBloodType'>Type of Blood</label>
          <select
            className='form-control'
            name='pacientBloodType'
            id='pacientBloodType'
          >
            <option value='O+' selected={pacient.BloodType === 'O+'}>
              O+
            </option>
            <option value='O-' selected={pacient.BloodType === 'O-'}>
              O-
            </option>
            <option value='A+' selected={pacient.BloodType === 'A+'}>
              A+
            </option>
            <option value='A-' selected={pacient.BloodType === 'A-'}>
              A-
            </option>
            <option value='B+' selected={pacient.BloodType === 'B+'}>
              B+
            </option>
            <option value='B-' selected={pacient.BloodType === 'B-'}>
              B-
            </option>
            <option value='AB+' selected={pacient.BloodType === 'AB+'}>
              AB+
            </option>
            <option value='AB-' selected={pacient.BloodType === 'AB-'}>
              AB-
            </option>
          </select>
        </div>
        <div className='field'>
          <label htmlFor='pacientHeight'>Height</label>
          <input
            className='form-control'
            type='text'
            name='pacientHeight'
            id='pacientHeight'
            placeholder={id && pacient.Heigh}
          />
        </div>{' '}
        <div className='field'>
          <label htmlFor='pacientWeight'>Wight</label>
          <input
            className='form-control'
            type='text'
            name='pacientWeight'
            id='pacientWeight'
            placeholder={id && pacient.Weight}
          />
        </div>
        <div className='field'>
          <label htmlFor='pacientGenre'>Genre</label>
          <select
            className='form-control'
            name='pacientGenre'
            id='pacientGenre'
          >
            <option value='Female'>Female</option>
            <option value='Male'>Male</option>
            <option value='Other'>Other</option>
          </select>
        </div>
      </section>
      <div className='actions'>
        <input type='submit' className='btn btn-primary' />
      </div>
    </StyledPacientForm>
  );
}
