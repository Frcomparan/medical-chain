import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../routes/Home'
import PacientsList from '../pacients/PacientsList'
import GlobalStyle from '../styles/GlobalStyle'
import Nav from '../components/Nav'
import Aside from '../components/Aside'
import { Main } from './styles'
import { Context } from '../Context'

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
						<Route path='/' element={<Home />}></Route>
						<Route path='/pacients' element={<PacientsList />}></Route>
					</Routes>
				</div>
			</Main>
		</Router>
	)
}

export default App