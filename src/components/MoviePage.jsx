import {Container, Row} from 'react-bootstrap'
import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'

function MoviePage() {
  const {id} = useParams();
  const [movie, setMovie] = useState({})

  useEffect(() => {
    (async function getData() {
      const res = await axios.get(`http://localhost:8888/movie/id/${id}`);
      setMovie(res.data);
      console.log(res.data)
    })()
  }, [id])
  return <Container fluid="fluid">
    <Row>
      <h1>{movie.Title}</h1>
    </Row>
  </Container>
}

export default MoviePage;
