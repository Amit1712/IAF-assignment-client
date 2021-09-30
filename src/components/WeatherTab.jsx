import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  Form
} from 'react-bootstrap'
import WeatherCard from './WeatherCard'
import axios from 'axios'
import {useState, useEffect} from 'react'

function Results({results}) {
  return <Row className="g-4" style={{
      justifyContent: 'space-evenly'
    }}>
    {
      results.map((item, idx) => {
        return <WeatherCard location={item} key={idx}/>
      })
    }
  </Row>
}

function WeatherTab() {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({
    "weather": [
      {
        "main": "Clouds",
        "description": "overcast clouds"
      }
    ],
    "main": {
      "temp": 17.74,
      "feels_like": 17.55,
      "temp_min": 16.11,
      "temp_max": 19.1
    },
    "wind": {
      "speed": 1.34
    },
    "sys": {
      "country": "GB"
    },
    "name": "London"
  })

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      let crd = pos.coords;
      const res = await axios.get(`http://localhost:8888/weather/cords/${crd.latitude.toString()}&${crd.longitude.toString()}`);
      await setCurrentLocation(res.data);
    }, (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    });
  }, [])

  useEffect(() => {
    setError(false);
  }, [results]);

  const handleClick = async (e) => {
    setResults([])
    switch (e.target.id) {
      case 'name':
        {
          const name = document.querySelector('#name').value;
          const res = await axios.get(`http://localhost:8888/weather/name/${name}`);
          if (res.data.cod !== 200) {
            setError(true);
          } else {
            setResults([res.data])
            setShowResults(true)
          }
        }
        break;
      case 'cords':
        {
          const lon = document.querySelector('#lon').value,
            lat = document.querySelector('#lat').value;
          const res = await axios.get(`http://localhost:8888/weather/cords/${lat}&${lon}`);
          if (res.data.cod !== 200) {
            setError(true);
          } else {
            setResults([res.data])
            setShowResults(true)
          }
        }
        break;
      case 'circle':
        {
          const lon = document.querySelector('#clon').value,
            lat = document.querySelector('#clat').value,
            cnt = document.querySelector('#cnt').value;
          const res = await axios.get(`http://localhost:8888/weather/circle/${lon}&${lat}&${cnt}`)
          if (res.data.cod !== '200') {
            setError(true);
          } else {
            setResults(res.data.list)
            setShowResults(true)
          }
        }
        break;
      case 'bbox':
        {
          const bbox = document.querySelector('#bbox').value;
          const res = await axios.get(`http://localhost:8888/weather/multi/${bbox}`)
          if (res.data.cod !== 200) {
            setError(true);
          } else {
            setResults(res.data.list)
            setShowResults(true)
          }
        }
        break;
      default:
        break;
    }
  }

  return <Container fluid="fluid">
    <Row>
      <Col lg={4}>
        <WeatherCard location={currentLocation} key={1}/>
      </Col>
      <Col lg={8}>
        <Form.Group>
          <InputGroup className="mb-3 mt-3">
            <FormControl placeholder="Enter city name" id="name"/>
            <Button variant="outline-dark" id="name" onClick={handleClick}>
              Search
            </Button>
          </InputGroup>
        </Form.Group>
        <InputGroup className="mb-3">
          <FormControl placeholder="Latitude" id="lat"/>
          <FormControl placeholder="Longitude" id="lon"/>
          <Button variant="outline-dark" id="cords" onClick={handleClick}>
            Search
          </Button>
        </InputGroup>
        <InputGroup className="mb-3">
          <FormControl placeholder="Longitude" id="clon"/>
          <FormControl placeholder="Latitude" id="clat"/>
          <FormControl placeholder="Count" id="cnt"/>
          <Button variant="outline-dark" id="circle" onClick={handleClick}>
            Search
          </Button>
        </InputGroup>
        <InputGroup className="mb-3">
          <FormControl placeholder="lon-left, lat-bottm, lon-right, lat-top, zoom" id="bbox"/>
          <Button variant="outline-dark" id="bbox" onClick={handleClick}>
            Search
          </Button>
        </InputGroup>
      </Col>
    </Row>
    {showResults && <h3>Results:</h3>}
    {showResults && <Results results={results}/>}
    {error && <p className="mt-4 p-2">Sorry, no city found</p>}
  </Container>
}

export default WeatherTab;
