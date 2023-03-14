import React from 'react'

async function getResponse() {
  const url = `http://localhost:8080/api/pacients/1`
  const resp = await fetch(url)
  const data = await resp.json()
  console.log({ resp })
  console.log({ data })
  data.map((item) => {
    console.log({ item })
  })
}

function Home() {
  getResponse()
  return <h1>This is the home</h1>
}

export default Home
