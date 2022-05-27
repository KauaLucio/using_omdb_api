import { useEffect, useState } from "react"
import { instance } from "./axios"
import { Button } from "./components/Button"
import { Container } from "./components/Container"
import { ContainerButtons } from "./components/ContainerButtons"
import { GridContainer } from "./components/GridContainer"
import { MovieSingleContainer } from "./components/MovieSingleContainer"
import { Navbar } from "./components/Navbar"
import { PosterImg } from "./components/PosterImg"
import { SearchBar } from "./components/SearchBar"
import { Text } from "./components/Text"
import { TextLogo } from "./components/TextLogo"


function App() {
  const [searchTerm, setSearchTerm] = useState('')
  let [page, setPage] = useState(0)
  let [totalPages, setTotalPages] = useState(0)
  const [results, setResults] = useState([])

  useEffect(() => {
    changePage()
    async function changePage() {
      page < 1 ? setPage(1) : setPage(page)
      const {data} = await instance.get(`/?apikey=a7178ea7&s=${searchTerm}&page=${page}`)
      setResults(data['Search'])
    }
  }, [page])

  const handleSearchOmdb = async (e: React.KeyboardEvent) => {
    setPage(1)
    if(e.key === 'Enter') {
      const {data} = await instance.get(`/?apikey=a7178ea7&s=${searchTerm}&page=${page}`)
      setTotalPages(Math.ceil(data.totalResults / 10))
      return setResults(data['Search'])
    }
  }

  return (
    <div>
      <Navbar>
        <Container isFlexible={true}>
          <TextLogo>
            OMDb Movie
          </TextLogo>
          <SearchBar 
            type="text" 
            placeholder="Busque por filme ou série" 
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => handleSearchOmdb(e)}
            />
        </Container>
      </Navbar>
      <Container>
        <GridContainer>
          {
            results?.map(result => (
              <MovieSingleContainer key={result['imdbID']}>
                <PosterImg src={result['Poster']} alt={result['Title']} />
              </MovieSingleContainer>
            ))
          }
        </GridContainer>
        {
          totalPages > 1 && (
            <ContainerButtons>
              <Button onClick={() => setPage(page -= 1)}>
                Voltar Pagina
              </Button>
              <Text fontSize="16px">{page}</Text>
              <Button onClick={() => setPage(page += 1)}>
                Próxima Pagina
              </Button>
            </ContainerButtons>
          )
        }
      </Container>
    </div>
  )
}

export default App
