import React from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './routes/Home'
import PacientsList from './pacients/PacientsList'
import GlobalStyle from './styles/GlobalStyle'

function App() {
  return (
    <Router>
        <GlobalStyle />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/pacients' element={<PacientsList />}></Route>
        </Routes>
    </Router>
  )
}

export default App
