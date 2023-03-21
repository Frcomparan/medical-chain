export const getPacients = async () => {
  const url = `http://localhost:8080/api/pacients`;
  const resp = await fetch(url);
  const data = await resp.json();
  return data;
};
