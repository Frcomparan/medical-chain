import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StyledPacientForm } from './style';
import axios from 'axios';

export default function PacientForm() {
  const { id } = useParams();
  const [pacient, setPacient] = useState([]);
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bloodType, setBloodType] = useState('0+');
  const [birthdate, setBirthdate] = useState('');
  const [genre, setGenre] = useState('Female');

  const getPacient = async () => {
    const url = `http://localhost:8080/api/pacients/${id}`;
    const resp = await fetch(url);
    const data = await resp.json();
    setPacient(data);
    setName(data.Name);
    setLastname(data.LastName);
    setHeight(data.Height);
    setWeight(data.Weight);
    setGenre(data.Genre);
    setBloodType(data.BloodType);
    setBirthdate(data.Birthdate);
  };

  useEffect(() => {
    getPacient();
  }, []);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8080/api/pacients', {
        id: '10',
        name,
        lastname,
        height,
        weight,
        bloodType,
        birthdate,
        genre,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(birthdate);
  return (
    <StyledPacientForm onSubmit={onSubmitHandler}>
      <h1>Add a new pacient</h1>
      <section>
        <div className='field form-group'>
          <label htmlFor='pacientName'>Name</label>
          <input
            required
            className='form-control'
            type='text'
            name='pacientName'
            id='pacientName'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='field form-group'>
          <label htmlFor='pacientLastName'>Lastname</label>
          <input
            required
            className='form-control'
            type='text'
            name='pacientLastName'
            id='pacientLastName'
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div className='field form-group'>
          <label htmlFor='pacientBirthdate'>Birthdate</label>
          <input
            required
            className='form-control'
            type='date'
            name='pacientBirthdate'
            id='pacientBirthdate'
            onChange={(e) => setBirthdate(e.target.value)}
            value={birthdate}
          />
        </div>
      </section>
      <section>
        <div className='field'>
          <label htmlFor='pacientBloodType'>Type of Blood</label>
          <select
            required
            className='form-control'
            name='pacientBloodType'
            id='pacientBloodType'
            defaultValue='O+'
            onChange={(e) =>
              setBloodType(
                e.target.options[e.target.options.selectedIndex].text
              )
            }
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
            required
            className='form-control'
            type='text'
            name='pacientHeight'
            id='pacientHeight'
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>{' '}
        <div className='field'>
          <label htmlFor='pacientWeight'>Wight</label>
          <input
            required
            className='form-control'
            type='text'
            name='pacientWeight'
            id='pacientWeight'
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div className='field'>
          <label htmlFor='pacientGenre'>Genre</label>
          <select
            className='form-control'
            name='pacientGenre'
            id='pacientGenre'
            required
            onChange={(e) =>
              setGenre(e.target.options[e.target.options.selectedIndex].text)
            }
          >
            <option value='Female' selected={pacient.Genre === 'Female'}>
              Female
            </option>
            <option value='Male' selected={pacient.Genre === 'Male'}>
              Male
            </option>
            <option value='Other' selected={pacient.Genre === 'Other'}>
              Other
            </option>
          </select>
        </div>
      </section>
      <div className='actions'>
        <input type='submit' className='btn btn-primary' />
      </div>
    </StyledPacientForm>
  );
}
