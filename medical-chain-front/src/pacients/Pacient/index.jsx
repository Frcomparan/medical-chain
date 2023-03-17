import React from 'react'
import { StyledPacient } from './style'

export default function Pacient() {
  return (
    <StyledPacient>
      <h1>Full pacient name...</h1>
      <div className='pacient-container'>
        <img
          src='https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_female-512.png'
          alt='pacient-icon'
        />
        <div className='pacient-info'>
          <div className='data-section'>
            <div className='data'>
              <span>Weight</span>
              <p>80 kg</p>
            </div>
            <div className='data'>
              <span>Heigt</span>
              <p>180 cm</p>
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
              <p>O-</p>
            </div>
          </div>
        </div>
      </div>
      <a href='/pacient/1/edit' className='btn btn-primary'>
        Edit
      </a>
    </StyledPacient>
  )
}
