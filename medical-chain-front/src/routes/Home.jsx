import React, { useContext, useEffect } from 'react';
import { Context } from '../Context';
import PacientsList from '../pacients/PacientsList';

function Home() {
  const { isHome, activateHome } = useContext(Context);
  useEffect(activateHome, []);
  console.log(isHome);

  return (
    <div>
      <h1>This is the home</h1>
    </div>
  );
}

export default Home;
