import { useEffect, useState } from 'react';
import { getPacients } from '../helpers/getPacients';

export const useFetchPacients = () => {
  const [pacients, setPacients] = useState([]);
  const getPacientsList = async () => {
    const newPacientes = await getPacients();
    setPacients(newPacientes);
  };
  useEffect(() => {
    getPacientsList();
  }, []);
  return {
    pacients,
  };
};
