import React, { useContext } from 'react'
import styled from 'styled-components'
import { Context } from '../../Context'
import PacientCard from '../PacientCard'
import { StyledPacientList } from './style'

const H1 = styled.h1`
  color: red;
  font-size: 20px;
`

function PacientsList() {
  const { isHome } = useContext(Context)

  return (
    <StyledPacientList>
      <h1>Pacients</h1>
      <PacientCard />
      <PacientCard />
      <PacientCard />
      <PacientCard />
      <PacientCard />
    </StyledPacientList>
  )
}

export default PacientsList
