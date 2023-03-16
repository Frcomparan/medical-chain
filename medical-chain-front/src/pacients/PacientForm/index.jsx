import React from 'react'
import { StyledPacientForm } from './style'

export default function PacientForm() {
	return (
		<StyledPacientForm action=''>
			<h1>Add a new pacient</h1>
			<section>
				<div className='field'>
					<label htmlFor='pacientName'>Full name</label>
					<input
						className='form-control'
						type='text'
						name='pacientName'
						id='pacientName'
					/>
				</div>
				<div className='field form-group'>
					<label htmlFor='pacientBirthdate'>Birthdate</label>
					<input
						className='form-control'
						type='date'
						name='pacientBirthdate'
						id='pacientBirthdate'
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
						<option value='O+'>O+</option>
						<option value='O-'>O-</option>
						<option value='A+'>A+</option>
						<option value='A-'>A-</option>
						<option value='B+'>B+</option>
						<option value='B-'>B-</option>
						<option value='AB+'>AB+</option>
						<option value='AB-'>AB-</option>
					</select>
				</div>
				<div className='field'>
					<label htmlFor='pacientHeight'>Height</label>
					<input
						className='form-control'
						type='text'
						name='pacientHeight'
						id='pacientHeight'
					/>
				</div>{' '}
				<div className='field'>
					<label htmlFor='pacientWeight'>Wight</label>
					<input
						className='form-control'
						type='text'
						name='pacientWeight'
						id='pacientWeight'
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
				<input type='submit' />
			</div>
		</StyledPacientForm>
	)
}
