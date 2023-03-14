import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Home'
import About from './About'
import PacientsList from './Pacients/PacientsList'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/pacients' element={<PacientsList />}></Route>
      </Routes>
    </Router>
  )
}

export default App
