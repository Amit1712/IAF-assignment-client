import {
  Container,
  Row,
  Col,
  FormControl,
  InputGroup,
  Button
} from 'react-bootstrap'
import {useState} from 'react'
import MovieCard from './MovieCard'
import axios from 'axios'

function Results({movies}) {
  return (<Row className="g-4" style={{
      justifyContent: 'space-evenly'
    }}>
    {
      movies.map((movie, idx) => {
        return <MovieCard movie={movie} key={idx}/>
      })
    }
  </Row>)
}

function MoviesTab() {

  const [movies, setMovies] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = async () => {
    setMovies([]);
    const query = document.getElementById('query').value;
    const res = await axios.get(`http://localhost:8888/movie/search/${query}`);
    if (res.data.Search) {
      setMovies(res.data.Search);
      setError(false);
    } else {
      setError(true);
    }
    setShowResults(true);

  }

  return <Container fluid="fluid">
    <Row>
      <Col>
        <h1>Movies</h1>
        <InputGroup className="mb-3">
          <FormControl placeholder="Search movies..." aria-describedby="basic-addon2" id="query"/>
          <Button variant="dark" onClick={handleSearch}>
            Search
          </Button>
        </InputGroup>
      </Col>
    </Row>
    {showResults && <h3>Results:</h3>}
    {showResults && <Results movies={movies}/>}
    {error && <p className="mt-4 p-2">Sorry, no results</p>}
  </Container>
}

export default MoviesTab;
