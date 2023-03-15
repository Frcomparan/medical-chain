import React, { createContext, useState } from 'react'
export const Context = createContext()

const Provider = ({ children }) => {
	const [isHome, setIsHome] = useState(false)

	const value = {
		isHome,
		activateHome: () => setIsHome(true),
		deactivateHome: () => setIsHome(false),
	}

	return <Context.Provider value={value}>{children}</Context.Provider>
}

export default {
	Provider,
	Consumer: Context.Consumer,
}
