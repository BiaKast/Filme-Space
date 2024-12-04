const fetchMovies2 = async (link: string) => {
  const resut = await fetch(link)
  const data = await resut.json()

  return data.results
}

export default fetchMovies2
