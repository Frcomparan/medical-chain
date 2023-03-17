import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../routes/Home'
import PacientsList from '../pacients/PacientsList'
import GlobalStyle from '../styles/GlobalStyle'
import Nav from '../components/Nav'
import Aside from '../components/Aside'
import { Main } from './styles'
import { Context } from '../Context'
import PacientForm from '../pacients/PacientForm'
import Pacient from '../pacients/Pacient'

function App() {
  const { isHome } = useContext(Context)
  return (
    <Router>
      <GlobalStyle />
      <Main>
        <Nav value={isHome}></Nav>
        <Aside></Aside>
        <div className='content'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/pacients' element={<PacientsList />} />
            <Route path='/pacients/:id' element={<Pacient />} />
            <Route path='/pacients/new' element={<PacientForm />} />
            <Route path='/pacients/:id/edit' element={<PacientForm />} />
          </Routes>
        </div>
      </Main>
    </Router>
  )
}

export default App
