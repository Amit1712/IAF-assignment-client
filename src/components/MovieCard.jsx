import {Card, Button} from 'react-bootstrap'

function MovieCard({movie}) {
  return <Card style={{
      width: '18rem',
      textAlign: 'center'
    }}>
    <Card.Img variant="top" src={movie.Poster} className="thumbnail m-auto"/>
    <Card.Body>
      <Card.Title>{movie.Title}</Card.Title>
      <Card.Text>
        Came out in {movie.Year}
      </Card.Text>
      <Button variant="dark" href={`/movie/${movie.imdbID}`}>More details</Button>
    </Card.Body>
    <Card.Footer>
      {movie.Type.charAt(0).toUpperCase() + movie.Type.slice(1)}
    </Card.Footer>
  </Card>

}

export default MovieCard;
