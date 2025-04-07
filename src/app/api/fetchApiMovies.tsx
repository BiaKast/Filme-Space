const fetchMovies = async (link: string) => {
  const result = await fetch(link)
  const data = await result.json()

  return data
}

export default fetchMovies
