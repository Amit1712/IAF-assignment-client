import {Card} from 'react-bootstrap'

function WeatherCard({location}) {

  const capitalize = (s) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  return (<Card className="p-3" style={{
      width: '18rem'
    }}>
    <Card.Body>
      <Card.Title>{location.name}, {" "}
        <span>{
            location.sys
              ? location.sys.country
              : null
          }</span>
        {' - '}{location.main.temp}°C
      </Card.Title>
      <Card.Subtitle className="mb-3 text-muted">{location.weather[0].main}
        - {capitalize(location.weather[0].description)}</Card.Subtitle>
      <Card.Text>
        Feels Like: {location.main.feels_like}°C {' / '}Max: {location.main.temp_max}°C {' / '}
        Min: {location.main.temp_min}°C
      </Card.Text>
      <Card.Text>Wind Speed: {location.wind.speed}</Card.Text>
    </Card.Body>
  </Card>)
}

export default WeatherCard;
