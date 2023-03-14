export const getGifs = async (category) => {
  const url = `http://localhost:8080/api/pacients`
  const resp = await fetch(url)
  const { data } = await resp.json()

  const gifs = data.map((img) => ({
    id: img.id,
    title: img.title,
    url: img.images.downsized_medium.url,
  }))

  return gifs
}
