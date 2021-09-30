import {Container, Row} from 'react-bootstrap'

import Header from './Header'
import WeatherTab from './WeatherTab'
import MoviesTab from './MoviesTab'
import MoviePage from './MoviePage'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function Welcome() {
  return <Row>
    <h1 className="p-5 mt-4">Hello to my web-app, choose one of the tabs above</h1>
  </Row>
}

function App() {

  return (<Container fluid="fluid">
    <Header/>
    <div className="placeholder"></div>
    <Router>
      <Switch>
        <Route path="/" exact={true} component={Welcome}/>
        <Route path="/weather" exact={true} component={WeatherTab}/>
        <Route path="/movies" exact={true} component={MoviesTab}/>
        <Route path="/movie/:id" component={MoviePage}/>
      </Switch>
    </Router>
  </Container>);
}

export default App;
