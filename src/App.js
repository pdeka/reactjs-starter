import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Preview from './Preview';
import NotFound from './NotFound';
import Home from './Home';
import ContactUs from './ContactUs';
import Articles from './Articles';
import About from './About';
import Team from './Team';
import Testimonials from './Testimonials';
import './styles/css/App.css';

const App = (props) => (
  <Router>
    <Switch>
      <Redirect exact from="/" to="/home"/>
      <Route exact path="/home" render={routeProps => <Home {...routeProps} prismicCtx={props.prismicCtx} />} />
      <Route exact path="/contactus" render={routeProps => <ContactUs {...routeProps} prismicCtx={props.prismicCtx} />} />
      <Route exact path="/articles" render={routeProps => <Articles {...routeProps} prismicCtx={props.prismicCtx} />} />
      <Route exact path="/about" render={routeProps => <About {...routeProps} prismicCtx={props.prismicCtx} />} />
      <Route exact path="/team" render={routeProps => <Team {...routeProps} prismicCtx={props.prismicCtx} />} />
      <Route exact path="/testimonials" render={routeProps => <Testimonials {...routeProps} prismicCtx={props.prismicCtx} />} />
      <Route exact path="/preview" render={routeProps => <Preview {...routeProps} prismicCtx={props.prismicCtx} />} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default App;
